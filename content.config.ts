import {
  defineCollection,
  defineContentConfig,
  z,
} from '@nuxt/content'

const seoSchema = z.object({
  title: z.string()
    .optional()
    .editor({
      label: 'SEO başlığı',
      description:
        'Arama sonuçlarında ve sekme adında görünür. '
        + 'Boş bırakılırsa sayfa başlığı kullanılır.',
    }),

  description: z.string()
    .optional()
    .editor({
      input: 'textarea',
      label: 'SEO açıklaması',
      description:
        'Arama sonuçlarında görünen kısa özet. '
        + 'Boş bırakılırsa sayfa açıklaması kullanılır.',
    }),
}).optional()

export default defineContentConfig({
  collections: {
    /**
     * Site geneli ayarlar: site adı, menü ve alt bilgi.
     */
    settings: defineCollection({
      type: 'data',

      source: 'settings.yml',

      schema: z.object({
        name: z.string()
          .nonempty()
          .editor({
            label: 'Site adı',
            description:
              'Sekme başlığında ve paylaşım önizlemelerinde görünür.',
          }),

        wordmark: z.string()
          .nonempty()
          .editor({
            label: 'Logo yazısı',
            description:
              'Sol üstte, logonun yanında görünen kısa ad.',
          }),

        navigation: z.array(z.object({
          label: z.string()
            .nonempty()
            .editor({
              label: 'Bağlantı metni',
            }),

          to: z.string()
            .nonempty()
            .editor({
              label: 'Adres',
              description:
                'Site içi adres, örneğin /blog.',
            }),
        }))
          .default([])
          .editor({
            label: 'Menü',
            description:
              'Sağ üstteki menüde soldan sağa görünür.',
          }),

        footer: z.object({
          credits: z.string()
            .nonempty()
            .editor({
              label: 'Telif metni',
              description:
                'Alt bilgide solda görünür, örneğin "© 2026 mahzen.bio".',
            }),

          links: z.array(z.object({
            icon: z.string()
              .nonempty()
              .editor({
                input: 'icon',
                label: 'İkon',
              }),

            to: z.string()
              .nonempty()
              .editor({
                label: 'Adres',
                description:
                  'Tam URL ya da site içi adres, örneğin /contact.',
              }),

            ariaLabel: z.string()
              .nonempty()
              .editor({
                label: 'Erişilebilirlik etiketi',
                description:
                  'Ekran okuyucuların okuduğu açıklama.',
              }),

            target: z.enum(['_blank', '_self'])
              .optional()
              .editor({
                label: 'Açılış şekli',
                description:
                  'Dış bağlantılar için _blank seçin; yeni sekmede açılır.',
              }),
          }))
            .default([])
            .editor({
              label: 'Bağlantılar',
              description:
                'Alt bilgide sağda görünen ikon bağlantıları.',
            }),
        }),
      }),
    }),

    /**
     * Ana sayfanın metinleri.
     */
    index: defineCollection({
      type: 'page',

      source: 'index.yml',

      schema: z.object({
        seo: seoSchema,

        hero: z.object({
          badge: z.string()
            .nonempty()
            .editor({
              label: 'Üst etiket',
              description:
                'Başlığın üstündeki küçük rozet metni.',
            }),

          image: z.string()
            .nonempty()
            .editor({
              input: 'media',
              label: 'Arka plan görseli',
              description:
                'Ana sayfanın en üstünde, yazının arkasında görünür. Geniş görseller en iyi sonucu verir.',
            }),

          imageAlt: z.string()
            .nonempty()
            .editor({
              label: 'Arka plan görsel açıklaması',
              description:
                'Görselde ne olduğunu anlatır; ekran okuyucular için gereklidir.',
            }),

          actionLabel: z.string()
            .nonempty()
            .editor({
              label: 'Buton metni',
              description:
                'Yazılar sayfasına giden butonun üstündeki metin.',
            }),
        }),

        blog: z.object({
          featuredEyebrow: z.string()
            .nonempty()
            .editor({
              label: 'Öne çıkan üst etiket',
              description:
                'Başlığın üstünde küçük harflerle görünen etiket.',
            }),

          featuredTitle: z.string()
            .nonempty()
            .editor({
              label: 'Öne çıkan yazı başlığı',
              description:
                'En yeni yazının üstünde görünen küçük başlık.',
            }),

          latestEyebrow: z.string()
            .nonempty()
            .editor({
              label: 'Son yazılar üst etiketi',
              description:
                'Başlığın üstünde küçük harflerle görünen etiket.',
            }),

          latestTitle: z.string()
            .nonempty()
            .editor({
              label: 'Son yazılar başlığı',
              description:
                'Yazı listesinin üstünde görünen başlık.',
            }),

          allLabel: z.string()
            .nonempty()
            .editor({
              label: 'Tüm yazılar butonu',
              description:
                'Listenin altındaki, /blog sayfasına giden butonun metni.',
            }),

          empty: z.string()
            .nonempty()
            .editor({
              label: 'Yazı yokken görünecek metin',
              description:
                'Henüz yayımlanmış bir yazı olmadığında gösterilir.',
            }),
        }),

        cta: z.object({
          title: z.string()
            .nonempty()
            .editor({
              label: 'Kapanış başlığı',
              description:
                'Ana sayfanın en altındaki iletişim davetinin başlığı.',
            }),

          description: z.string()
            .nonempty()
            .editor({
              input: 'textarea',
              label: 'Kapanış açıklaması',
            }),

          label: z.string()
            .nonempty()
            .editor({
              label: 'Kapanış buton metni',
            }),
        }),
      }),
    }),

    /**
     * /blog sayfasının başlık ve açıklaması.
     */
    blogPage: defineCollection({
      type: 'page',

      source: 'blog.yml',

      schema: z.object({
        seo: seoSchema,
      }),
    }),

    /**
     * İletişim sayfasının metinleri ve form etiketleri.
     */
    contact: defineCollection({
      type: 'page',

      source: 'contact.yml',

      schema: z.object({
        seo: seoSchema,

        form: z.object({
          subjectLabel: z.string()
            .nonempty()
            .editor({
              label: 'Konu alanı etiketi',
            }),

          subjectPlaceholder: z.string()
            .nonempty()
            .editor({
              label: 'Konu alanı ipucu metni',
            }),

          messageLabel: z.string()
            .nonempty()
            .editor({
              label: 'Mesaj alanı etiketi',
            }),

          messagePlaceholder: z.string()
            .nonempty()
            .editor({
              label: 'Mesaj alanı ipucu metni',
            }),

          submitLabel: z.string()
            .nonempty()
            .editor({
              label: 'Gönder butonu metni',
            }),

          successMessage: z.string()
            .nonempty()
            .editor({
              input: 'textarea',
              label: 'Başarı mesajı',
              description:
                'Mesaj başarıyla iletildiğinde gösterilir.',
            }),

          errorMessage: z.string()
            .nonempty()
            .editor({
              input: 'textarea',
              label: 'Hata mesajı',
              description:
                'Mesaj gönderilemediğinde gösterilir.',
            }),
        }),
      }),
    }),

    /**
     * Blog yazıları. Her yazı `content/blog/` altında bir Markdown dosyası.
     */
    blog: defineCollection({
      type: 'page',

      source: 'blog/*.md',

      schema: z.object({
        title: z.string()
          .nonempty()
          .editor({
            label: 'Başlık',
            description:
              'Yazının adı. Kartta, yazı sayfasında ve arama sonuçlarında görünür.',
          }),

        description: z.string()
          .nonempty()
          .editor({
            input: 'textarea',
            label: 'Kısa açıklama',
            description:
              'Kartta ve arama sonuçlarında görünen bir–iki cümlelik özet.',
          }),

        date: z.date()
          .editor({
            label: 'Yayın tarihi',
            description:
              'Yazılar en yeniden eskiye doğru sıralanır.',
          }),

        image: z.string()
          .nonempty()
          .editor({
            input: 'media',
            label: 'Kapak görseli',
            description:
              'Kartta ve yazının üstünde görünür. Yatay (16:9) görseller en iyi sonucu verir.',
          }),

        imageAlt: z.string()
          .nonempty()
          .editor({
            label: 'Görsel açıklaması',
            description:
              'Görselde ne olduğunu anlatır; ekran okuyucular ve arama motorları için gereklidir.',
          }),

        category: z.string()
          .nonempty()
          .editor({
            label: 'Kategori',
            description:
              'Yazının ana konusu, tek kelime olması en iyisi. Kartın üstünde rozet olarak görünür.',
          }),

        tags: z.array(z.string())
          .default([])
          .editor({
            label: 'Etiketler',
            description:
              'Yazının altında listelenen konu etiketleri.',
          }),

        // `.int()` yerine `.multipleOf(1)`: `.int()` JSON şemasında tipi
        // `integer` yapıyor, Nuxt Content bu tipi tanımadığı için sütunu
        // TEXT'e düşürüyor ve okuma süresi metin olarak geri dönüyor.
        minRead: z.number()
          .positive()
          .multipleOf(1)
          .editor({
            label: 'Okuma süresi (dakika)',
            description:
              'Yaklaşık okuma süresi. Yaklaşık 200 kelime bir dakikadır.',
          }),

        draft: z.boolean()
          .default(false)
          .editor({
            label: 'Taslak',
            description:
              'Açıkken yazı sitede görünmez; üzerinde çalışmaya devam edebilirsiniz.',
          }),
      }),
    }),
  },
})
