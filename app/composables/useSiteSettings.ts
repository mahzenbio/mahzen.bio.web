/**
 * Site adı, menü ve alt bilgi `content/settings.yml` dosyasından gelir; böylece
 * Studio üzerinden düzenlenebilirler. `app.vue` bu veriyi bekleyerek çeker, aynı
 * anahtarı paylaşan bileşenler ise hazır gelen sonucu okur.
 */
export function useSiteSettings() {
  return useAsyncData(
    'site-settings',
    () => queryCollection('settings').first(),
  )
}
