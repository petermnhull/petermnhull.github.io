// Reads the frontmatter of every post in public/blog and writes src/posts.json,
// so adding a post is just a matter of dropping a new .md file in that folder.
const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "..", "public", "blog");
const outFile = path.join(__dirname, "..", "src", "posts.json");

const posts = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => {
    const text = fs.readFileSync(path.join(blogDir, file), "utf8");
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatter) {
      throw new Error(`${file} is missing frontmatter`);
    }
    const fields = Object.fromEntries(
      frontmatter[1].split("\n").map((line) => {
        const [key, ...rest] = line.split(":");
        return [
          key.trim(),
          rest
            .join(":")
            .trim()
            .replace(/^"(.*)"$/, "$1"),
        ];
      })
    );
    return {
      slug: file.replace(/\.md$/, ""),
      title: fields.title,
      date: fields.date,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2) + "\n");
