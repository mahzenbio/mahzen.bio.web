/**
 * Geçerli bir `Date` ya da `null` döndürür. Studio'dan tarihi doldurulmadan
 * kaydedilmiş bir yazıda `new Date(null)` sessizce 1970'e düştüğü, geçersiz
 * bir metin ise `toISOString()` içinde hata fırlattığı için tarihler her zaman
 * buradan geçirilmeli.
 */
export function toValidDate(value: Date | string | number | null | undefined): Date | null {
  if (value === null || value === undefined || value === '')
    return null

  const date = value instanceof Date ? value : new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value: Date | string | null | undefined) {
  const date = toValidDate(value)

  if (!date)
    return ''

  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}
