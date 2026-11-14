# petermnhull.github.io

My personal website, currently hosted [here](http://petermnhull.github.io).

## Writing a post

Add a Markdown file to `public/blog/`, named however you want the URL slug to look (e.g. `2025_01_01_my_post.md`), starting with:

```md
---
title: "My Post"
date: 2025-01-01
---
```

Put images in `public/images/` (WebP, around 1400px wide) and reference them as `![Alt text](../images/my_image.webp)` (relative paths make images show up both on the site and when viewing the file on GitHub). Link to another post by its file name, e.g. `[my other post](2024_01_02_gophercon_2023.md)`. Use fenced code blocks for code.

The blog list is generated from the frontmatter automatically when you run `npm start` or `npm run build`.

## Development

### `npm start`

Runs the app in the development mode with live reloading.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `serve -s build`

Run the production build on [http://localhost:3000](http://localhost:3000).

## Deployment

Every push to `main` is built and deployed to GitHub Pages by `.github/workflows/deploy.yml`. You can also re-run a deploy by hand from the Actions tab.
