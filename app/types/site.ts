export interface SiteNavigationItem {
  label: string
  to: string
}

export interface SiteFooterLink {
  icon: string
  to: string
  ariaLabel: string
  target?: '_blank' | '_self'
}

export interface SiteFooter {
  credits: string
  links: SiteFooterLink[]
}

export interface SiteAppConfig {
  name: string
  wordmark: string
  navigation: SiteNavigationItem[]
  footer: SiteFooter
}

export interface ContactFormState {
  subject: string
  message: string
}
