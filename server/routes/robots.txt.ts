export default defineEventHandler((event) => {
  const { public: { siteUrl } } = useRuntimeConfig(event)

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /__nuxt_studio/',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n')
})
