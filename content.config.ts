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
     * Ana sayfanın metinleri.
     */
    index: defineCollection({
      type: 'page',

      source: 'index.yml',

      schema: z.object({
        seo: seoSchema,

        blog: z.object({
          title: z.string()
            .nonempty()
            .editor({
              label: 'Yazılar başlığı',
              description:
                'Yazı listesinin üstünde görünen başlık.',
            }),

          empty: z.string()
            .nonempty()
            .editor({
              label: 'Yazı yokken görünecek metin',
              description:
                'Henüz yayımlanmış bir yazı olmadığında gösterilir.',
            }),
        }),
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
              'Tek kelimelik ana konu, örneğin Nuxt. Kartın üstünde rozet olarak görünür.',
          }),

        tags: z.array(z.string())
          .default([])
          .editor({
            label: 'Etiketler',
            description:
              'Yazının altında listelenen konu etiketleri.',
          }),

        minRead: z.number()
          .int()
          .positive()
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
