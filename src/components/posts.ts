import posts from "../posts.json";
import { Language, locales } from "./language";

export interface Post {
  slug: string;
  title: string;
  date: string;
}

export const allPosts: Post[] = posts;

export const findPost = (slug?: string) =>
  allPosts.find((post) => post.slug === slug);

export const formatDate = (date: string, language: Language) =>
  new Date(date).toLocaleDateString(locales[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
