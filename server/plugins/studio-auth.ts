export default defineNitroPlugin(() => {
  // Studio reads its GitHub credentials and session key under its own env names.
  // This project standardises on the NUXT_* names, so map them across once at boot.
  process.env.STUDIO_GITHUB_CLIENT_ID = process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID
  process.env.STUDIO_GITHUB_CLIENT_SECRET = process.env.NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET
  process.env.NUXT_STUDIO_AUTH_SESSION_SECRET = process.env.NUXT_SESSION_PASSWORD

  // Comma separated list of GitHub primary e-mails allowed into /admin. Studio
  // only enforces it when the variable is non-empty, and assigning `undefined`
  // to process.env would store the string "undefined" and lock everyone out --
  // hence the guard rather than an unconditional assignment.
  if (process.env.NUXT_STUDIO_AUTH_GITHUB_MODERATORS) {
    process.env.STUDIO_GITHUB_MODERATORS = process.env.NUXT_STUDIO_AUTH_GITHUB_MODERATORS
  }
})
