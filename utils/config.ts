const siteName = process.env?.NUXT_PUBLIC_SITE_NAME || 'siteName'
const siteShortName = process.env?.NUXT_PUBLIC_SITE_SHORT_NAME || 'siteShortName'
const siteDescription = process.env?.NUXT_PUBLIC_SITE_DESCRIPTION || 'siteDescription'

/**
 * configMeta
 * @type {{meta: [{name: string, content: string},{name: string, content: string},{name: string, content: string},{name: string, content: string}]}}
 */
export const configMeta: { [ key: string ]: any } = {
  meta:   [
    { charset: 'utf-8' },
    { name: 'HandheldFriendly', content: 'true' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'fragment', content: '!' },
    { name: 'theme-color', content: '#F69435' },
    { name: 'format-detection', content: 'telephone=no' },
    {
      name:    'viewport',
      content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover'
    },
    { property: 'og:site_name', content: siteName },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:url', property: 'og:url', content: `/` },
    { hid: 'og:title', property: 'og:title', content: siteName },
    { hid: 'og:description', property: 'og:description', content: siteDescription },
    { hid: 'og:image', property: 'og:image', content: `/cover.png` },
    { property: 'og:image:width', content: '500' },
    { property: 'og:image:height', content: '500' }
  ],
  link:   [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'apple-touch-icon', href: '/icons/safari-pinned-tab.svg', sizes: '180x180' },
    { rel: 'mask-icon', href: '/icon.png', color: '#00BFFF' }
  ],
  script: [
    {
      src:   '/verbox.js',
      async: true
    }
  ]
}

/**
 * config PWA https://pwa.nuxtjs.org/meta
 * @type {{workbox: {enabled: boolean}}}
 */
export const configPWA = {
  start_url:          '/?source=pwa',
  'background_color': '#00BFFF',
  'theme_color':      '#00BFFF',
  workbox:            {
    enabled: process.env.NODE_ENV === 'production'
  },
  icon:               {
    //source:   '[srcDir]/[staticDir]/icon.png',
    fileName: 'icon.png',
    sizes:    [ 32, 40, 48, 58, 64, 72, 76, 80, 96, 108, 120, 144, 152, 162, 167, 180, 192, 216, 324, 384, 432, 512, 1024 ]
  },
  manifest:           {
    name:                    siteName,
    short_name:              siteShortName,
    lang:                    'ru',
    useWebmanifestExtension: true
  }

}

/**
 * show On Devices
 * @param devices
 * @param device
 * @returns {boolean}
 */
export const showOnDevices = ( devices: string[], device: string ): boolean =>
    ( device && devices.length ) ? devices.includes( device ) : false

/**
 * scroll To
 * @param el: HTMLElement
 * @param bottom
 */
export const scrollToEl = ( el: HTMLElement, bottom = false ) => {
  if ( !el ) return
  el.scrollIntoView( { block: ( bottom ) ? 'end' : 'start', behavior: 'smooth' } )
}