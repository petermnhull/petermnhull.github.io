import Markdown from "markdown-to-jsx";
import React from "react";
import Code from "./Code";
import Header from "./Header";
import { LanguageProps } from "./language";
import { Page } from "./pages";

interface blogProps {
  fileName: string;
  languageProps: LanguageProps;
}

const markdownOptions = {
  overrides: {
    CodeBlock: Code,
  },
};

export default function Blog(p: blogProps) {
  const [post, setPost] = React.useState("");
  React.useEffect(() => {
    import(`./blogs/${p.fileName}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Header page={Page.BLOG} languageProps={p.languageProps} />
      <div id="post">
        <Markdown options={markdownOptions}>{post}</Markdown>
      </div>
    </div>
  );
}
