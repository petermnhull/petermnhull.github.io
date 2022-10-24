import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Blogs from "./Blogs";
import NotFound from "./NotFound";
import { b1 } from "../constants";

const getBlogRoutes = () => {
  return <Route path={"blog/" + b1.fileName} element={<Blog fileName={b1.fileName + ".md"}/>}/>
}

const App = () => {
  return (
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="blog" element={<Blogs />}/>
              {getBlogRoutes()}
              <Route path="*" element={<NotFound />}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>
  )
}

export default App;