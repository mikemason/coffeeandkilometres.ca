# Coffee & Kilometres

A travel and overlanding resource website built with Astro 5, Tailwind CSS 4, and TypeScript.

## Tech Stack

- **Framework**: Astro 5 (latest stable)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Hosting**: Cloudflare Pages (ready to deploy)
- **Maps**: Leaflet with OpenStreetMap tiles
- **Content**: MDX with content collections

## Features

- **Content Collections**: Organized structure for guides and blog posts
- **Interactive Maps**: Leaflet component with GPX track support
- **Photo Galleries**: Lightbox-enabled galleries with lazy loading
- **Dark/Light Mode**: Toggle with persistent preference
- **SEO Optimized**: Sitemaps, RSS feed, meta tags, and structured data
- **Mobile Responsive**: Clean design that works on all devices
- **Performance**: Static site generation for fast loading

## Project Structure

```
/
├── public/
│   ├── gpx/                 # GPX track files
│   ├── images/              # Static images
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Gallery.astro    # Photo gallery with lightbox
│   │   ├── Header.astro     # Navigation header
│   │   ├── InfoBox.astro    # Callout boxes
│   │   ├── Map.astro        # Leaflet map with GPX support
│   │   └── ThemeToggle.astro
│   ├── content/
│   │   ├── blog/            # Blog posts (MDX)
│   │   ├── guides/          # Travel guides (MDX)
│   │   └── config.ts        # Content collection schemas
│   ├── layouts/
│   │   └── Layout.astro     # Base layout
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── guides/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── about.astro
│   │   ├── gallery.astro
│   │   ├── index.astro
│   │   └── rss.xml.ts
│   └── styles/
│       └── global.css
└── package.json
```

## Getting Started

### Development

```bash
# Start the dev server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Adding Content

### Create a New Guide

1. Create a new `.mdx` file in `src/content/guides/`
2. Add frontmatter with required fields:

```mdx
---
title: 'Your Guide Title'
description: 'Brief description'
pubDate: 2024-06-15
heroImage: '/images/your-image.jpg'
heroImageAlt: 'Image description'
tags: ['tag1', 'tag2']
featured: true
gpxFile: '/gpx/your-route.gpx'
location:
  country: 'Country'
  region: 'Region'
distance: '500 km'
duration: '2-3 days'
---

Your content here...
```

### Create a New Blog Post

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter:

```mdx
---
title: 'Post Title'
description: 'Brief description'
pubDate: 2024-06-15
tags: ['tag1', 'tag2']
location: 'Location Name'
---

Your content here...
```

### Using Components

#### Interactive Map

```mdx
import Map from '../../components/Map.astro';

<Map gpxFile="/gpx/your-route.gpx" />
```

#### Photo Gallery

```mdx
import Gallery from '../../components/Gallery.astro';

<Gallery images={[
  { src: '/images/photo1.jpg', alt: 'Description', caption: 'Optional caption' },
  { src: '/images/photo2.jpg', alt: 'Description' },
]} />
```

#### Info Box

```mdx
import InfoBox from '../../components/InfoBox.astro';

<InfoBox type="warning" title="Important">
Your message here
</InfoBox>
```

Types: `info`, `warning`, `tip`, `danger`

## Deploying to Cloudflare Pages

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: None required

The site will automatically deploy on every push to your main branch.

## Customization

### Colors and Theme

Edit `src/styles/global.css` to customize colors:

```css
:root {
  --color-bg: 255 255 255;
  --color-text: 23 23 23;
  --color-accent: 37 99 235;
  /* ... */
}
```

### Navigation

Edit navigation items in `src/components/Header.astro`:

```javascript
const navItems = [
  { label: 'Guides', href: '/guides' },
  { label: 'Blog', href: '/blog' },
  // Add more items...
];
```

### Site Metadata

Update in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://coffeeandkilometres.ca',
  // ...
});
```

## Adding GPX Tracks

1. Export your route as GPX from your GPS device or app
2. Place the file in `public/gpx/`
3. Reference it in your guide's frontmatter: `gpxFile: '/gpx/route-name.gpx'`
