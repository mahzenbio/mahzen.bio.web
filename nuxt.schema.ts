export default defineNuxtSchema({
  appConfig: {
    footer: {
      $schema: {
        title: 'Alt bilgi',
        description:
          'Her sayfanın en altında görünen alan.',
      },

      credits: {
        $default: '',

        $schema: {
          title: 'Telif metni',
          description:
            'Sol tarafta görünen kısa metin, örneğin "© 2026 mahzen.bio".',
          type: 'string',
        },
      },

      links: {
        $default: [],

        $schema: {
          title: 'Bağlantılar',
          description:
            'Sağ tarafta görünen ikon bağlantıları.',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              icon: {
                title: 'İkon',
                description:
                  'Iconify ikon adı, örneğin i-lucide-mail veya i-simple-icons-github.',
                type: 'string',
              },
              to: {
                title: 'Adres',
                description:
                  'Tam URL, örneğin https://github.com/mahzenbio.',
                type: 'string',
              },
              ariaLabel: {
                title: 'Erişilebilirlik etiketi',
                description:
                  'Ekran okuyucuların okuduğu açıklama.',
                type: 'string',
              },
              target: {
                title: 'Açılış şekli',
                type: 'string',
                enum: ['_blank', '_self'],
              },
            },
          },
        },
      },
    },
  },
})
