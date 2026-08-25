import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

// rss.xml ile aynı gerekçe: site haritası, eksik bir alan yüzünden
// prerender'ı düşürmemeli.
async function readPosts(event: H3Event) {
  try {
    return await queryCollection(event, 'blog')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()
  }
  catch (error) {
    console.error('[sitemap.xml] yazılar okunamadı:', error)

    return []
  }
}

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  const posts = await readPosts(event)

  const now = new Date()
  const latest = toValidDate(posts[0]?.date) ?? now

  const urls = [
    {
      loc: '/',
      lastmod: latest,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: '/blog',
      lastmod: latest,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      loc: '/contact',
      lastmod: now,
      changefreq: 'yearly',
      priority: '0.5',
    },
    ...posts
      .filter(post => post.path)
      .map(post => ({
        loc: post.path,
        // Tarihi eksik bir yazı da haritada yer alsın; sadece lastmod bugüne düşer.
        lastmod: toValidDate(post.date) ?? now,
        changefreq: 'monthly',
        priority: '0.8',
      })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(`${siteUrl}${url.loc}`)}</loc>
    <lastmod>${url.lastmod.toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return xml
})
