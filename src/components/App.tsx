import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Blog from "./Blog";
import Blogs from "./Blogs";
import NotFound from "./NotFound";
import { initialLanguage, languageCodes, saveLanguage } from "./language";

export default function App() {
  const [language, setLanguage] = React.useState(initialLanguage);
  React.useEffect(() => {
    document.documentElement.lang = languageCodes[language];
    saveLanguage(language);
  }, [language]);
  const languageProps = { language, setLanguage };
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home {...languageProps} />} />
          <Route path="blog" element={<Blogs {...languageProps} />} />
          <Route
            path="blog/:slug"
            element={<Blog languageProps={languageProps} />}
          />
          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
