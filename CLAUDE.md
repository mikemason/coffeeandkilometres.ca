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

**Static assets**: images in `public/images/`, GPX tracks in `public/gpx/`.

## Writing voice

Content on this site follows a specific voice — see memory for humanizer calibration details. When editing MDX content, apply the `/humanizer` skill rather than rewriting from scratch.
