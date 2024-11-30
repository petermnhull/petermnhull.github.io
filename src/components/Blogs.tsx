import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Header from "./Header";
import { blogs } from "./constants";
import { Language } from "./language";
import { Page } from "./pages";

const getBlogContents = () => {
  return blogs.map((blog) => (
    <p>
      <Link to={blog.fileName}>{blog.title}</Link>
    </p>
  ));
};

interface blogsProps {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
}

export default function Blogs(p: blogsProps) {
  return (
    <div>
      <Header
        page={Page.BLOG}
        language={p.language}
        setLanguage={p.setLanguage}
      />
      {getBlogContents()}
    </div>
  );
}
