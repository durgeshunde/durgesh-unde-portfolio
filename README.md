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

- `src/main.jsx`: original portfolio sections, content, links and research archive.
- `src/styles.css`: original dark visual identity and responsive layout.
- `src/enhancements.css`: added animation, depth effects and Apart research styling.
- `src/NeuralScene.jsx`: lazy loaded Three.js scene and accessible controls.
- `src/ApartResearch.jsx`: featured Apart research project.
- `public/assets/`: existing application screenshots and resume.
- `public/research/`: earlier independent writing, retained as PDF downloads.

The hero contains a lazy loaded Three.js WebGL scene with two modes, pointer interaction and a pause control. It respects reduced motion, caps rendering at 30 fps and skips rendering when outside the viewport or when the page is hidden. A CSS orbital illustration appears if WebGL is unavailable. Fonts use Google Fonts with local fallbacks.

Research graphics are conceptual illustrations, not experimental results. Product screenshots are the original application screenshots. The Apart research repository and submitted report are linked without modification.
