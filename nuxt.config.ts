import { configMeta, configPWA } from './utils/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig( {

  telemetry: false,
  //@ts-ignore
  meta: configMeta,

  css: [
    '@/assets/styles/index.scss'
  ],

  runtimeConfig: {
    public: {
      appWriteUrl:     process.env.NUXT_PUBLIC_APPWRITE_URL,
      apiUrl:          process.env.NUXT_PUBLIC_API_URL,
      siteUrl:         process.env.NUXT_PUBLIC_SITE_URL,
      siteName:        process.env.NUXT_PUBLIC_SITE_NAME,
      siteShortName:   process.env.NUXT_PUBLIC_SITE_SHORT_NAME,
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION
    }
  },

  modules: [
    '@kevinmarrec/nuxt-pwa',
    '@nuxt/image',
    '@nuxt/devtools',
    [ '@nuxtjs/plausible', {
      domain:               'blog.arecords.store',
      autoOutboundTracking: false,
      autoPageviews:        true,
      hashMode:             false,
      trackLocalhost:       false,
      apiHost:              'https://plausible.docsme.ru'
    } ],
    [ '@pinia/nuxt', { autoImports: [ 'defineStore', [ 'defineStore', 'definePiniaStore' ] ] } ]
  ],

  image: {
    quality: 80,
    format:  [ 'webp' ]
    // domains: [
    //   'images.unsplash.com'
    // ],
    // alias:   {
    //   unsplash: 'https://images.unsplash.com'
    // }
  },

  typescript: {
    shim:   true,
    strict: true
  },

  types: [
    '@pinia/nuxt'
  ],

  experimental: {
    viewTransition:      false, // https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental
    asyncEntry:          false,
    crossOriginPrefetch: false,
    clientFallback:      true
  },

  devtools: {
    // Enable devtools (default: true)
    enabled:            true,
    componentInspector: true,
    viteInspect:        true,
    experimental:       { timeline: false },
    timeline:           false,
    // VS Code Server options
    vscode: { enabled: false }
    // ...other options
  },

  pwa: configPWA,
  // pwa: ( process.env.NODE_ENV === 'production' ) ? configPWA : { workbox: { enabled: false } },

  // pwa:      {
  //   // @ts-ignore
  //   workbox: {
  //     enabled:      process.env.NODE_ENV === 'production',
  //     autoRegister: process.env.NODE_ENV === 'production'
  //   },
  //   // @ts-ignore
  //   meta: {
  //     favicon:             true,
  //     name:                AppMeta.name,
  //     author:              AppMeta.author || '',
  //     description:         AppMeta.description || '',
  //     theme_color:         AppMeta.themeColor,
  //     lang:                AppMeta.lang,
  //     appleStatusBarStyle: AppMeta.appleStatusBarStyle,
  //     mobileApp:           AppMeta.mobileApp,
  //     mobileAppIOS:        AppMeta.mobileAppIOS,
  //     title:               '',
  //     ogType:              'site'
  //   },
  //
  //   manifest: {
  //     start_url:        '/',
  //     display:          'standalone',
  //     name:             AppMeta.name,
  //     short_name:       AppMeta.shortName || 'DocsMe',
  //     theme_color:      AppMeta.themeColor || 'DocsMe',
  //     background_color: AppMeta.backgroundColor || '#FFFFFF',
  //     description:      AppMeta.description || '',
  //     lang:             AppMeta.lang,
  //     icons:            []
  //     // useWebmanifestExtension: false
  //   },
  //
  //   icon: {
  //     source:    'public/icon.png',
  //     fileName:  'icon.png',
  //     sizes:     [ 20, 29, 32, 40, 48, 58, 60, 64, 72, 76, 80, 87, 96, 108, 120, 144, 152, 162, 167, 180, 192, 216, 324,
  //       384, 432, 512, 1024 ],
  //     targetDir: 'icons',
  //     splash:    {
  //       backgroundColor: AppMeta.themeColor,
  //       devices:         [],
  //       targetDir:       'splash'
  //     },
  //     //@ts-ignore
  //     purpose: [ 'any', 'maskable' ]
  //   }
  // },
  // https://strapi.nuxtjs.org/usage
  buildModules: [
    '@pinia/nuxt'
  ]

} )