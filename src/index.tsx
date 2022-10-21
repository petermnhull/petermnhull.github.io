import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import "./styling.css"
import { HashRouter, Routes, Route } from "react-router-dom";
import { NOTFOUND } from 'dns';

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="blog" element={<Blog />}/>
              <Route path="*" element={<NotFound />}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
