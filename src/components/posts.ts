import posts from "../posts.json";

export interface Post {
  slug: string;
  title: string;
  date: string;
}

export const allPosts: Post[] = posts;

export const findPost = (slug?: string) =>
  allPosts.find((post) => post.slug === slug);

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
