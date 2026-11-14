import Markdown from "markdown-to-jsx";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";
import { findPost, formatDate } from "./posts";

interface blogProps {
  languageProps: LanguageProps;
}

const postUrl = (slug: string) =>
  new URL(`${process.env.PUBLIC_URL}/blog/${slug}.md`, window.location.href);

// Resolve image paths relative to the post file, so the same relative path
// works on the site and when viewing the Markdown on GitHub.
const markdownOptions = (slug: string) => ({
  overrides: {
    img: {
      component: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <img
          {...props}
          alt={props.alt}
          src={props.src && new URL(props.src, postUrl(slug)).href}
          loading="lazy"
        />
      ),
    },
  },
});

const translations: Record<Language, { loading: string; failed: string }> = {
  [Language.EN]: {
    loading: "Loading…",
    failed: "Sorry, this post didn't load. Try refreshing the page.",
  },
  [Language.FR]: {
    loading: "Chargement…",
    failed:
      "Désolé, cet article n'a pas pu être chargé. Essayez de rafraîchir la page.",
  },
};

const stripFrontmatter = (text: string) =>
  text.replace(/^---\n[\s\S]*?\n---\n/, "");

export default function Blog(p: blogProps) {
  const { slug } = useParams();
  const post = findPost(slug);
  const language = p.languageProps.language;
  const text = translations[language];
  // undefined while loading, null if the post failed to load
  const [body, setBody] = React.useState<string | null>();

  React.useEffect(() => {
    if (!post) {
      return;
    }
    setBody(undefined);
    fetch(postUrl(post.slug))
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load post: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => setBody(stripFrontmatter(text)))
      .catch((err) => {
        console.log(err);
        setBody(null);
      });
  }, [post]);

  if (!post) {
    return <NotFound language={language} />;
  }

  return (
    <div>
      <Header page={Page.BLOG} languageProps={p.languageProps} />
      <article id="post">
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{formatDate(post.date, language)}</time>
        {body === undefined ? (
          <p className="loading">{text.loading}</p>
        ) : body === null ? (
          <p className="loading">{text.failed}</p>
        ) : (
          <Markdown options={markdownOptions(post.slug)}>{body}</Markdown>
        )}
      </article>
    </div>
  );
}
