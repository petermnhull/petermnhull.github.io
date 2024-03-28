import { Link } from "react-router-dom";
import Header from "./Header";
import { blogs } from "./constants";

const getBlogContents = () => {
  return blogs.map((blog) => (
    <p>
      <Link to={blog.fileName}>{blog.title}</Link>
    </p>
  ));
};

export default function Blogs() {
  return (
    <div>
      <Header page="blog" />
      {getBlogContents()}
    </div>
  );
}
