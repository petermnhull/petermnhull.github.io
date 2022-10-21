import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
        <h1>
            Blogs
        </h1>
        <p>
            Hello, some blogs will live here soon.
        </p>
        <h4>
            <Link to="/">Go back.</Link>
        </h4>
    </div>
  );
}

export default Blog;