import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Blogs from "./Blogs";
import NotFound from "./NotFound";
import { blogs } from "./constants";

const getBlogRoutes = () => {
    return blogs.map((blog) => (
        <Route path={"blog/" + blog.fileName} element={<Blog fileName={blog.fileName + ".md"} />} />
    ));
};

const App = () => {
    return (
        <React.StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="blog" element={<Blogs />} />
                    {getBlogRoutes()}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </React.StrictMode>
    );
};

export default App;
