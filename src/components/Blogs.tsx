import { Link } from "react-router-dom";
import Header from "./Header";
import { b1 } from "../constants";

const Blogs = () => {
  return (
    <div>
    <Header page="blog"/>
    <Link to={b1.fileName}>{b1.title}</Link>
    </div>
  );
}

export default Blogs;
