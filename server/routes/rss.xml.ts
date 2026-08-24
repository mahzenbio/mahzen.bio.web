import { queryCollection } from '@nuxt/content/server'

function escape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler(async (event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all()

  const items = posts.map(post => `  <item>
    <title>${escape(post.title)}</title>
    <link>${siteUrl}${post.path}</link>
    <guid isPermaLink="true">${siteUrl}${post.path}</guid>
    <description>${escape(post.description)}</description>
    <category>${escape(post.category)}</category>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  </item>`)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>mahzen.bio</title>
  <link>${siteUrl}</link>
  <description>Kitaplar, filmler, müzik ve arada kalan düşünceler üzerine kısa notlar.</description>
  <language>tr</language>
  <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
</channel>
</rss>`

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')

  return xml
})
