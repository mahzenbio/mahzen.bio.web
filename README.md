# mahzen.bio

Kişisel blog. Nuxt 4, Nuxt UI, Nuxt Content ve Nuxt Studio ile kurulu.

## Kurulum

```bash
pnpm install
cp .env.example .env   # değerleri doldur
pnpm dev
```

## Ortam değişkenleri

```env
NUXT_RESEND_API_KEY=
NUXT_RESEND_FROM="Mahzen.bio <noreply@mahzen.bio>"
NUXT_RESEND_TO=

NUXT_STUDIO_AUTH_GITHUB_CLIENT_ID=
NUXT_STUDIO_AUTH_GITHUB_CLIENT_SECRET=
NUXT_SESSION_PASSWORD=
NUXT_STUDIO_AUTH_GITHUB_MODERATORS=
```

`server/plugins/studio-auth.ts` bu isimleri Nuxt Studio'nun beklediği isimlere eşler.
GitHub OAuth uygulamasının callback adresi: `https://<alan-adı>/__nuxt_studio/auth/github`

`NUXT_STUDIO_AUTH_GITHUB_MODERATORS` virgülle ayrılmış bir e-posta listesidir; `/admin` yalnızca
bu listedeki GitHub hesaplarına açılır. Karşılaştırma hesabın primary e-postasıyla birebir yapılır
(büyük/küçük harf ve virgül sonrası boşluk dahil), commit e-postasıyla değil. Değişken boş
bırakılırsa herhangi bir GitHub hesabı panele girebilir; depoya yazma yetkisi olmadığı için commit
atamaz ama taslak içeriği görür ve AI/medya uçlarını kullanabilir.

Bu değişkenlerin aynısı Vercel proje ayarlarında da tanımlı olmalı — `.env` yalnızca yerelde geçerli.

## İçerik yönetimi

`/admin` adresinden GitHub ile giriş yapılır. Studio, `content/` altındaki dosyaları düzenler ve
değişiklikleri `mahzenbio/mahzen.bio.web` deposunun `main` dalına commit eder.

- `content/settings.yml` — site geneli: site adı, logo yazısı, üst menü ve alt bilgi
- `content/index.yml` — ana sayfa: hero başlığı, açıklaması, arka plan görseli, buton metni, bölüm başlıkları ve kapanış daveti
- `content/blog.yml` — /blog sayfasının başlığı ve açıklaması
- `content/contact.yml` — iletişim sayfası ve form etiketleri
- `content/blog/*.md` — blog yazıları

Sayfalar: `/` (öne çıkan + son yazılar), `/blog` (tüm yazılar), `/blog/<slug>`, `/contact`, `/admin`.

Yazı alanları `content.config.ts` içindeki şemadan gelir; Studio bu şemadan form üretir.
`draft` açık olan yazılar sitede, sitemap'te ve RSS'te görünmez.

## Komutlar

```bash
pnpm dev
pnpm build
pnpm lint
```
