import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

// Besleme, içerik yüzünden dağıtımı düşüremeyecek kadar ikincil bir uç nokta:
// sorgu patlarsa boş ama geçerli bir RSS dönsün, hata log'a düşsün.
async function readPosts(event: H3Event) {
  try {
    return await queryCollection(event, 'blog')
      .where('draft', '=', false)
      .order('date', 'DESC')
      .all()
  }
  catch (error) {
    console.error('[rss.xml] yazılar okunamadı:', error)

    return []
  }
}

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  const posts = await readPosts(event)

  const items = posts
    // Başlığı ya da adresi olmayan bir kayıt beslemede işe yaramaz.
    .filter(post => post.title && post.path)
    .map((post) => {
      const url = `${siteUrl}${post.path}`
      const date = toValidDate(post.date)

      return [
        '  <item>',
        `    <title>${escapeXml(post.title)}</title>`,
        `    <link>${escapeXml(url)}</link>`,
        `    <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        post.description ? `    <description>${escapeXml(post.description)}</description>` : null,
        post.category ? `    <category>${escapeXml(post.category)}</category>` : null,
        date ? `    <pubDate>${date.toUTCString()}</pubDate>` : null,
        '  </item>',
      ]
        .filter(line => line !== null)
        .join('\n')
    })

  const lastBuildDate = toValidDate(posts[0]?.date) ?? new Date()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>mahzen.bio</title>
  <link>${siteUrl}</link>
  <description>mahzen.bio üzerinde yayımlanan notlar, denemeler ve yazılar.</description>
  <language>tr</language>
  <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
</channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')

  return xml
})
