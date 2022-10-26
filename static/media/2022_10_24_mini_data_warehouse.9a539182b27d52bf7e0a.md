## Building a Mini Data Warehouse with Athena and Kafka Connect
#### 24.10.2022

At ComplyAdvantage, I'm in the Platform Team for the Customer Screening & Ongoing Monitoring product. Our mission is to simplify and modernise our backend architecture, ultimately to improve the customer experience and to attract new customers.

When I joined this team, we inherited a few problems: too many interconnected micro-services that combine to form a distributed monolith (a topic for another day), databases that needed optimising, and some unusual technology choices. And at the centre of this was our legacy monolith: a PHP server (called `AppCA-PHP`) and its MySQL database.

The PHP presents a risk to our organisation. The code is a mixture of inconsistent design patterns and bad practices. Even worse, it’s running an end-of-life version of Laravel that no one in the company is experienced with. All this means teams avoid making changes to it as much as possible, which complicates feature development and decreases velocity.

About a year ago, we decided that it was time for a rewrite, so we started porting code from PHP into Go.

We chose Go as we evaluated it to be the best choice for a high-performance case management system, and the team had experience in writing backend servers with it. We named the application `Arpeggio`, and focused on simple but high-volume `GET` endpoints. We got `Arpeggio` serving customers in production within months, by redirecting traffic via our API gateway (i.e. [Ambassador](https://www.getambassador.io/products/edge-stack/api-gateway/kubernetes-ingress-controller/)) from `AppCA-PHP` to `Arpeggio`.

### What challenges did we face?
Our testing framework for `GET` endpoints focused on initially shadowing production traffic to `Arpeggio` and manually testing our UI. Shadowing in particular was super useful, as it meant we got to compare the results in production without actually serving the new results to clients. This gave us a lot of confidence, and as we weren't modifying data, this was enough - if we needed to rollback, we just reverted configuration changes in our API gateway.

This turned out to be totally insufficient when we got to `POST`, `DELETE` and `PATCH` endpoints - you can't shadow non-idempotent requests with side effects, and there's no room for error when messing with customer data. If something wasn't covered by our tests which resulted in bad data getting stored, we were stuck.

### The Mini Data Warehouse
All of this led to one idea: a Mini Data Warehouse. We needed to be able to query over the requests that `Arpeggio` served, so that we could both understand the responses clients were served and perform a database rollback in the case of an incident. But we didn't need a fully-fledged data warehouse solution such as Snowflake or Redshift; we just needed a comprehensive log of production requests.

This is what the pipeline we came up with looks like:

<img src="blog_2022_10_24_a.png" alt="Pipeline Part 1" width="90%" height="auto">

#### Kafka Event Middleware
The first step was to set up a middleware in `Arpeggio` which captures every request *and* the corresponding response. This then gets sent to our shared in-house Kafka cluster.

We made use of a [MultiWriter](https://pkg.go.dev/io#MultiWriter) to copy the output to a buffer. Everything is then serialised in Protobuf format and finally sent to Kafka using SegmentIO's [kafka-go](https://github.com/segmentio/kafka-go) package.

The events look something like this:

<CodeBlock>
{
  "id": "123abc",
  "createdAt": "2022-09-06T11:49:34Z",
  "request": {
    "path": "/searches/{id}",
    "method": "get"
  },
  "response": {
    "status": "200",
    "body": "{\"data\":{...}",
    "headers": {
      "Content-Type": "application/json",
    }
  },
  "accountId": "123"
}
</CodeBlock>

#### Kafka Connect and S3
Now that the requests are recorded in Kafka, we sink the events from Kafka into S3 using [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html).

S3 was an obvious decision: at ComplyAdvantage, we use it anytime we need a cheap blob store. But using Kafka as a buffer between Arpeggio and S3 is a more interesting design choice.

We decided to do this instead of calling S3 directly for a number of reasons:
* We already had this design pattern in a few places (e.g. sinking customer profiles from one service to a MongoDB via Kafka Connect). Our Strimzi Kafka Connect clusters were pretty much ready to plug-and-play.
* It was a good opportunity to validate our vision for Event Driven Design (i.e. using Kafka to decouple consumers and producers).
* The latency requirements for storing requests were low and so a lag introduced by a Kafka broker was acceptable.

#### Athena
Once in S3, we can query over our data by using Athena on the AWS console. Athena uses a query language (similar to SQL) for searching over all the records. It can be a bit slow (e.g. it takes ~10 seconds to look at a day’s worth of requests), but that’s okay as we only need it for one-off queries when investigating an incident or for analysing the responses that our users receive. This limited usage also kept costs low, with our queries and S3 storage altogether accounting for less than 1% of our AWS bill.

### Did it work?
Yes!

With all of `Arpeggio`'s requests and responses being stored in S3, we were able to fully understand what customers were receiving during the migration of an endpoint from PHP to Go.

Unfortunately, we really found out that the system worked through an incident - the processing for one endpoint was incorrect, leading to invalid data in the database.

Luckily, we could find all the failed requests via Athena and replay the payloads through `AppCA-PHP` to recreate the request properly. 

The pipeline enabled us to rebuild the data into a consistent state.

### What came next?
A downside of this design is that we can only send request/response pairs to S3 if the request was served by `Arpeggio`.

This downside, along with a few other reasons, lead us to making some external changes so we could use the pipeline for a broader scope. Instead of using Ambassador to route requests to `Arpeggio` or `AppCA-PHP`, we move that logic into the `Arpeggio` application code. This means that everything gets served by `Arpeggio`.

At the time of writing, the pipeline looks a little something like this:

<img src="blog_2022_10_24_b.png" alt="Pipeline Part 2" width="90%" height="auto">

This gives us numerous advantages:
* As mentioned above, responses served by the PHP can be seen in S3.
* Unlike `AppCA-PHP`, `Arpeggio` has comprehensive observability tooling with [DataDog](https://www.datadoghq.com/). If everything goes through `Arpeggio`, that means our distributed tracing shows up in DataDog.
* Finally, the routing logic in Ambassador is very complicated and difficult to test. With that logic now in `Arpeggio`, we can unit test it and avoid issues caused by human error when updating Ambassador's complicated Regex-based configuration.

### Conclusion
Now that we've got a real-time event store and a stable process for migrating traffic, decommissioning the PHP monolith is much safer to do. It is primarily thanks to this that `Arpeggio` is now serving >99% of requests to EU and US customers, giving us improved uptime, latency, and velocity.
