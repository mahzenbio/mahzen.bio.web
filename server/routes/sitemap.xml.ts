import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const latest = posts[0]?.date ?? new Date()

  const urls = [
    {
      loc: '/',
      lastmod: new Date(latest),
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: '/contact',
      lastmod: new Date(),
      changefreq: 'yearly',
      priority: '0.5',
    },
    ...posts.map(post => ({
      loc: post.path,
      lastmod: new Date(post.date),
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${url.lastmod.toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return xml
})
