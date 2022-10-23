import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Blogs from "./Blogs";
import NotFound from "./NotFound";

const App = () => {
  return (
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="blog" element={<Blogs />}/>
              <Route path="blog/test_blog" element={<Blog fileName="blog.md"/>}/>
              <Route path="*" element={<NotFound />}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
  )
}

export default App;