## Lessons in MLOps: How To Prioritise Automation

02.11.2022

This is a story from when I first got into MLOps at ComplyAdvantage in early 2021.

Hopefully this will show the challenges you might face when introducing automation into ML model evaluation - particularly in Natural Language Processing (NLP), where it's not always obvious exactly what you're looking for in the first place.

### NLP in Anti-Money Laundering

When I first joined ComplyAdvantage, I worked on the [Adverse Media & Insight](https://complyadvantage.com/negative-news-screening-tool) product.

To understand a little bit what this is for, imagine you're an analyst for a high street bank whose job it is to approve or reject applications for credit cards. To meet the bank's regulations you have to check that the applicant hasn't done anything _dodgy_. For example you might not be allowed to approve an application for someone who is on a sanctions list, or who is a [politically exposed person](https://en.wikipedia.org/wiki/Politically_exposed_person). You may also want to check if the applicant has shown up in the news.

The Adverse Media & Insight product provides a way to automate this final step, by revealing if the person has shown up in any news articles for doing something illegal or immoral (this is the _Adverse_ bit in _Adverse Media_).

How do we provide that data? We have a pipeline which scrapes the web for articles and uses machine learning models to figure out who is in the article (i.e. [Named Entity Recognition](https://en.wikipedia.org/wiki/Named-entity_recognition)) and what they've done (i.e. Text Classification). If the models decide that Bob Smith showed up in a BBC article for laundering money, the pipeline then sends that information to somewhere our client-facing systems can access. The pipeline looks like this:

<img src="blog_2022_11_02_a.png" alt="Pipeline" width="90%" height="auto">

### What if we want to change a model?

Sometimes our Data Scientists want to change the models that extract entities and classify sentences. For example, in early 2021 we swapped our classification tasks to use [BERT](https://en.wikipedia.org/wiki/BERT_(language_model) instead of LSTMs.

When we did this, we had to verify everything worked as expected when the new model was deployed. This involved a few tasks:

1. Determine latencies for serving predictions.
2. Determine the outputs that are _new_ or _changed_ (e.g. when a sentence changed classification).
3. Perform statistical significance tests on elements that shouldn't change, to check for bias creeping in.
4. For when we have annotated data, calculate the accuracy of the predictions.
5. Collect a random sample of outputs for manual annotation to verify the predictions.

We did most of this manually by pulling the outputs from a MongoDB and writing statistical analysis in Jupyter Notebooks, which was a time-consuming process.

### Let's automate!

We came up with a solution which automated the process for us, which consisted of adding two main components on both ends of the pipeline in a test environment:

1. Test Data Extraction - A simple Python script running as a Kubernetes job for pulling test articles from a database and pushing them into the start of the pipeline.
2. Analysis - A Python script using [Papermill](https://github.com/nteract/papermill) which generated analysis in Jupyter Notebooks. On completion, the results were stored in S3 in the form of HTML files for the completed notebooks, charts and CSVs.

<img src="blog_2022_11_02_b.png" alt="Pipeline Analysis" width="90%" height="auto">

This looked ideal, as anytime we want to deploy a new model we can run the pipeline and check if everything looks good in the analysis notebooks.

### Wait, why didn't this work?

Our pipeline did a number of things really well, in particular:

1. It was an effective mechanism for pushing a large amount of test data and quickly verifying the pipeline _works_ (this was already a big step up in being able to deploy with confidence).
2. It completely automated the process for collecting samples for manual annotation.
3. We provided an easily-extensible framework, e.g. for adding new types of analysis in notebooks.

However, our notebooks partially relied on a "gold test set", i.e. fully annotated outputs (i.e. classified sentences) corresponding to our inputs (i.e. news articles). But acquiring a gold test set was _hard_, and our data labelling provider struggled to provide us accurate annotations when manually checked by our in-house team. Without large-scale reliable annotated data, we couldn't produce the accuracy metrics we needed.

We also used a "silver test set", i.e. the outputs of the _production_ pipeline. This was useful for determining the _stability_ of certain pipeline changes (e.g. making sure everything works as before if you refactor something). The issue with this is that we introduced models which significantly changed the structure of our responses, such as [co-reference resolution](https://nlp.stanford.edu/projects/coref.shtml). Our pipeline required _on-going_ support in order to be useful for these kinds of changes.

### The lessons for next time

**Keep it simple** and **ruthlessly optimise** for business value, as it takes a long time to get anywhere near something like [Google's Level 2 System for MLOps](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning#mlops_level_2_cicd_pipeline_automation).

Forget all the fancy statistical tests and the gold test set; 99% of the business value was in pushing test data, collecting simple summary metrics and automated sampling. So next time we'll churn that out first and then iterate.

A bonus lesson (which is similar to my previous [blog](https://petermnhull.github.io/#/blog/2022_10_24_mini_data_warehouse)): if you have a mechanism for quickly rolling back your deployments and your data, focus on live monitoring and alerting instead of a test suite. Try setting up a canary deployment so you can start serving requests in production as soon as possible - nothing is more valuable than production data!
