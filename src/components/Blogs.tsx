import { Link, Outlet } from "react-router-dom";
import React from "react";
import Blog from "./Blog";
import Header from "./Header";

const Blogs = () => {
  return (
    <div>
    <Header page="blog"/>
    <Link to="test_blog">Test Blog (Actual Blog Coming Soon...)</Link>
    </div>
  );
}

export default Blogs;
