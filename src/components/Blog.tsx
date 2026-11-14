import Markdown from "markdown-to-jsx";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { LanguageProps } from "./language";
import { Page } from "./pages";
import { findPost, formatDate } from "./posts";

interface blogProps {
  languageProps: LanguageProps;
}

const markdownOptions = {
  overrides: {
    img: {
      props: { loading: "lazy" },
    },
  },
};

const stripFrontmatter = (text: string) =>
  text.replace(/^---\n[\s\S]*?\n---\n/, "");

export default function Blog(p: blogProps) {
  const { slug } = useParams();
  const post = findPost(slug);
  const [body, setBody] = React.useState<string>();

  React.useEffect(() => {
    if (!post) {
      return;
    }
    setBody(undefined);
    fetch(`${process.env.PUBLIC_URL}/blog/${post.slug}.md`)
      .then((res) => res.text())
      .then((text) => setBody(stripFrontmatter(text)))
      .catch((err) => console.log(err));
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div>
      <Header page={Page.BLOG} languageProps={p.languageProps} />
      <article id="post">
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {body === undefined ? (
          <p className="loading">Loading…</p>
        ) : (
          <Markdown options={markdownOptions}>{body}</Markdown>
        )}
      </article>
    </div>
  );
}
