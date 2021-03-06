import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - CapstoneFront',
    title: 'CapstoneFront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],
  // css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-simple-context-menu.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'vue-sweetalert2/nuxt',
    '@nuxtjs/toast',
    'nuxt-socket-io',
  ],

  io: {
    sockets: [
      {
        name: 'main',
        url: process.env.NODE_ENV === 'production' ? 'wss://gjgjajaj.xyz' : 'ws://localhost:3065',
        default: true,
      },
    ]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  toast: {
    position: 'bottom-right',
    duration: 5000,
    action: {
      text: 'CLOSE',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },
  },

  env: {
    WS_URL: process.env.NODE_ENV === 'production' ? 'wss://gjgjajaj.xyz/api/game' : 'ws://localhost:3065/api/game',
  },

  server:{
    port: 7000
  },
}
