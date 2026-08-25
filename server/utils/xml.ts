// Studio'dan bir yazı, şemadaki her alan doldurulmadan kaydedilebiliyor.
// O yüzden koleksiyondan gelen her değer burada "eksik olabilir" kabul edilir:
// yarım kalmış tek bir yazı, prerender'ı ve dolayısıyla tüm dağıtımı
// düşürmemeli.

/**
 * XML metin düğümü/öznitelik değeri için güvenli hâle getirir.
 * `null` / `undefined` boş metne düşer, XML 1.0'da geçersiz olan kontrol
 * karakterleri atılır.
 */
export function escapeXml(value: unknown) {
  if (value === null || value === undefined)
    return ''

  return String(value)
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\v\f\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Geçerli bir `Date` ya da `null` döndürür. `toISOString()` geçersiz tarihte
 * hata fırlattığı için tarihler her zaman buradan geçirilmeli.
 */
export function toValidDate(value: unknown): Date | null {
  if (value === null || value === undefined || value === '')
    return null

  const date = value instanceof Date ? value : new Date(value as string | number)

  return Number.isNaN(date.getTime()) ? null : date
}
