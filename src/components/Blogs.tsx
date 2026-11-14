import { Link } from "react-router-dom";
import Header from "./Header";
import { LanguageProps } from "./language";
import { Page } from "./pages";
import { allPosts, formatDate } from "./posts";

export default function Blogs(l: LanguageProps) {
  return (
    <div>
      <Header page={Page.BLOG} languageProps={l} />
      <ul id="post-list">
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
