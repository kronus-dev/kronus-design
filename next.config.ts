import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS in `out/`, so the site can be hosted on GitHub Pages.
  output: "export",
  // GitHub Pages serves this repo under /kronus-design. The deploy workflow sets
  // PAGES_BASE_PATH; locally it is empty, so the app runs at /.
  basePath: process.env.PAGES_BASE_PATH ?? "",
  // cacheComponents / partialPrefetching (template defaults) are left out:
  // they enable partial prerendering, which a static export can't use.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
