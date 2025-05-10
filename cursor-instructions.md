# Project Overview

This is a very simple blog website that is hosted in github pages. Here are the requirements:

- Run nvm use 20 first
- Use npm to install, not npx
- Uses React
- Uses Tailwind CSS v3 (this is important)
- Uses Vite
- There's two pages:
  - Home
  - Article
- The routing works with github pages, suno it's a single page app
- There's two default articles with lorem ipsum content
- This is static, so there is a markdown file for each article and a json file for the list of articles (with title, description, image, slug)
- To publish an article, add a markdown file, add it to the json file and commit to the repo.
- There's currently an image in the folder, that should be able to show up on the article page if I reference it. It's hosted in this repo.
- Markdown is rendered correctly.
- I can italicize text with _italic_ and do other markdown formatting.
- I can caption images and insert them in the text.
- Title of the blog is "Brundage Family"

# Design Specifications

- Elegant, newspaper-like design inspired by NYT
- Serif font for headings, sans-serif for body text
- Black and white primary color scheme with subtle grays
- Generous whitespace and clean typography
- Single column layout for articles
- Subtle grid for article cards on home page
- Images can be black and white with subtle drop shadows
- Elegant captions in italics
- Minimal header with simple navigation

# Technical Specifications

## Article JSON Structure

```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description",
      "image": "path/to/image.jpg",
      "slug": "article-title",
      "date": "2024-03-21",
      "contentPath": "content/article-title.md"
    }
  ]
}
```

## Markdown Features

- Basic markdown formatting
- Image support with captions
- Section dividers using `---section---` syntax
- No code syntax highlighting needed

## Image Component

- Lazy loading
- Fixed aspect ratio
- Object-fit: cover to prevent layout shift
- Caption support
- Black and white option

## Libraries

- react-markdown for markdown rendering
- remark-gfm for GitHub Flavored Markdown
- react-lazy-load-image-component for images

# Core functionalities

- The home page shows a list of articles with the title, description and image.
- The article page shows the article with the title, description and content.
- No authentication is required.
- No interaction is required.

# Doc

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)
- [React](https://react.dev/reference/react)
