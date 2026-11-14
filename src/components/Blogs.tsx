import { Link } from "react-router-dom";
import Header from "./Header";
import { Language, LanguageProps } from "./language";
import { Page } from "./pages";
import { allPosts, formatDate } from "./posts";

// The posts themselves are only in English, so say so rather than half-translate.
const notes: Record<Language, string | null> = {
  [Language.EN]: null,
  [Language.FR]: "Les articles sont en anglais.",
};

export default function Blogs(l: LanguageProps) {
  const note = notes[l.language];
  return (
    <div>
      <Header page={Page.BLOG} languageProps={l} />
      {note && <p id="post-list-note">{note}</p>}
      <ul id="post-list">
        {allPosts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
            <time dateTime={post.date}>
              {formatDate(post.date, l.language)}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
