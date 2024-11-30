import Markdown from "markdown-to-jsx";
import React, { Dispatch, SetStateAction } from "react";
import Code from "./Code";
import Header from "./Header";
import { Language } from "./language";
import { Page } from "./pages";

interface blogProps {
  fileName: string;
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
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
      <Header
        page={Page.BLOG}
        language={p.language}
        setLanguage={p.setLanguage}
      />
      <div id="post">
        <Markdown options={markdownOptions}>{post}</Markdown>
      </div>
    </div>
  );
}
