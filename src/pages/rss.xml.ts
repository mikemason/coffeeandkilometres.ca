import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  const guides = await getCollection('guides');

  const allContent = [...blog, ...guides]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Coffee & Kilometres',
    description: 'Travel guides, stories, and resources for overlanders and adventurers.',
    site: context.site || 'https://coffeeandkilometres.ca',
    items: allContent.map((item) => {
      const isGuide = 'distance' in item.data;
      return {
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.pubDate,
        link: `/${isGuide ? 'guides' : 'blog'}/${item.slug}/`,
        ...(item.data.tags && { categories: item.data.tags }),
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
