import colors from 'vuetify/es5/util/colors'
import dotenv from 'dotenv'
dotenv.config()

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export default {

  // publicRuntimeConfig: {
  //   GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - random-food',
    title: 'random-food',
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
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue2-google-maps.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
    // 'nuxt-vite',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/dotenv'
  ],
  toast: {
    position: 'top-right'
  },

  // これより下Googleログインのため追記
  router: {
    // middleware: ['auth']
    // See https://auth.nuxtjs.org/guide/middleware.html
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/main'
    },
    strategies: {
      app: {
        _scheme: 'oauth2',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scope: [
          'email',
          'profile',
          'openid',
          'https://www.googleapis.com/auth/drive.metadata.readonly'
        ],
        access_type: undefined,
        access_token_endpoint: undefined,
        response_type: 'token',
        token_type: 'Bearer',
        client_id: GOOGLE_CLIENT_ID, // .envで定義しておく
        token_key: 'access_token'
      }
    }
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, _) {
      config.plugins.push(new HardSourceWebpackPlugin())
    },
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
