export default defineNitroPlugin(() => {
  // Studio reads its GitHub credentials and session key under its own env names.
  // This project standardises on the NUXT_* names, so map them across once at boot.
  process.env.STUDIO_GITHUB_CLIENT_ID = process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID
  process.env.STUDIO_GITHUB_CLIENT_SECRET = process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET
  process.env.NUXT_STUDIO_AUTH_SESSION_SECRET = process.env.NUXT_SESSION_PASSWORD
})
