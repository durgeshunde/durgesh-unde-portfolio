# Durgesh Unde portfolio

React and Vite portfolio for AI engineering work, XYVERION AI and independent research. Published through the existing GitHub Pages workflow on pushes to `main`.

## Local development

Use Node 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The configured base path is `/durgesh-unde-portfolio/`.

```sh
npm run build
npm run preview
```

## Editing

- `src/Portfolio.jsx`: content, project links, process tabs and canvas sculpture.
- `src/redesign.css`: responsive layout, visual system and reduced motion support.
- `public/assets/`: existing application screenshots and resume.
- `public/research/`: earlier independent writing, retained as PDF downloads.

The hero sculpture is procedural Canvas 2D, with pointer interaction, three selectable forms and a pause control. It respects reduced motion and skips drawing outside the viewport. No external model or graphics API is required. Fonts use Google Fonts with local fallbacks.

Research graphics are conceptual illustrations, not experimental results. Product screenshots are the existing application screenshots; the business assistant card is labeled as an illustrative interface. The research repository and submitted report are linked without modification.
