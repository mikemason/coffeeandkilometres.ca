# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview production build
node scripts/resize-images.mjs   # resize images for web
node scripts/strip-exif.mjs      # strip EXIF metadata from images
```

## Architecture

Astro 5 static site with Tailwind CSS 4, MDX content, and TypeScript. Hosted on Cloudflare Pages.

**Content collections** (`src/content/config.ts`) define three types:
- `blog/` — travel posts; frontmatter: `title`, `description`, `pubDate`, `tags`, `location`
- `guides/` — trip guides; adds `gpxFile`, `location.country/region`, `distance`, `duration`, `featured`
- `build/` — van conversion log; adds `order` (integer, determines nav sequence)

Each collection has a dynamic slug page (`src/pages/[collection]/[...slug].astro`) and an index page.

**Van build** (`/van-build`) uses the `build` collection ordered by the `order` frontmatter field. Content files are `01-overview.mdx` through `08-exterior.mdx`; 04–08 are stubs pending content.

**Components** are in `src/components/`:
- `Map.astro` — Leaflet + OpenStreetMap, accepts `gpxFile` prop (path under `public/gpx/`)
- `Gallery.astro` — lightbox gallery, accepts `images` array `{ src, alt, caption? }`
- `InfoBox.astro` — callout box, accepts `type` (`info` | `warning` | `tip` | `danger`) and `title`
- `Header.astro` — nav; edit `navItems` array to change navigation links
- `ThemeToggle.astro` — dark/light mode toggle with localStorage persistence

**Styles** use Tailwind CSS 4 (Vite plugin, not PostCSS). CSS custom properties for color tokens live in `src/styles/global.css`.

**Static assets**: images in `public/images/`, GPX tracks in `public/gpx/`. Van build images live in `public/images/van-build/`.

## Image workflow

**Naming convention**: `name-original.jpg` for the raw file, `name-800.jpg` / `name-1920.jpg` for web-ready versions (number = width in px).

**Sizes to produce**:
- Full-width hero images: 1920px wide
- Float/inline content images: 800px wide (600px for portrait)
- The build index hero: 800px wide

**Resize with sharp** (already a dev dependency):
```js
node -e "import('sharp').then(async ({ default: sharp }) => {
  await sharp('public/images/van-build/name-original.jpg')
    .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile('public/images/van-build/name-800.jpg');
});"
```

**Float-right images in MDX** — use this pattern (adjust width class for portrait: `w-1/3`):
```mdx
<img src="/images/van-build/name-800.jpg" alt="..." class="float-right ml-6 mb-4 w-1/2 rounded-lg" />
```

Only commit the web-ready (`-800`, `-1920`) files, not the originals.

## Writing voice

Content on this site follows a specific voice — see memory for humanizer calibration details. When editing MDX content, apply the `/humanizer` skill rather than rewriting from scratch.
