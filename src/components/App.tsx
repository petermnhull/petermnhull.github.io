import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Blogs from "./Blogs";
import NotFound from "./NotFound";
import { blogs } from "./constants";
import { Language, LanguageProps } from "./language";

const getBlogRoutes = (props: LanguageProps) => {
  return blogs.map((blog) => (
    <Route
      path={"blog/" + blog.fileName}
      element={<Blog fileName={blog.fileName + ".md"} languageProps={props} />}
    />
  ));
};

export default function App() {
  const [language, setLanguage] = React.useState(Language.EN);
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<Home language={language} setLanguage={setLanguage} />}
          />
          <Route
            path="blog"
            element={<Blogs language={language} setLanguage={setLanguage} />}
          />
          {getBlogRoutes({ language, setLanguage })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
