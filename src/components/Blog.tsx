import Markdown from "markdown-to-jsx";
import React from "react";
import Code from "./Code";
import Header from "./Header";

interface blogProps {
  fileName: string;
}

const markdownOptions = {
  overrides: {
    CodeBlock: Code,
  },
};

const Blog = (p: blogProps) => {
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
      <Header page="blog" />
      <div id="post">
        <Markdown options={markdownOptions}>{post}</Markdown>
      </div>
    </div>
  );
};

export default Blog;
