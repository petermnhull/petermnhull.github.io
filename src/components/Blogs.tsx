import { Link } from "react-router-dom";
import Header from "./Header";
import { blogs } from "./constants";
import { LanguageProps } from "./language";
import { Page } from "./pages";

const getBlogContents = () => {
  return blogs.map((blog) => (
    <p>
      <Link to={blog.fileName}>{blog.title}</Link>
    </p>
  ));
};

export default function Blogs(l: LanguageProps) {
  return (
    <div>
      <Header page={Page.BLOG} languageProps={l} />
      {getBlogContents()}
    </div>
  );
}
