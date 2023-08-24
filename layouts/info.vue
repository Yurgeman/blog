<template>
  <div ref="main" class="nw-page">
    <div class="nw-page__body">
      <slot></slot>
    </div>

    <LayoutHeader />
    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store'
import { SetCssVar } from '~/utils/theme'

const store = useStore()
const main = ref( null )

defineExpose( { main } )

const changeDarkMode = ( state: boolean ) => store.darkMode = state

if ( process.client ) {
  const colors = computed( () => store.config.colors )
  if ( colors ) SetCssVar( colors.value )
}

useHead( {
  link: [
    { rel: 'icon', hid: 'icon', type: 'image/x-icon', href: '/favicon.png' }
  ]
} )

onMounted( async () => {
  if ( process.client ) {
    const observer = new ResizeObserver( entries => {
      window.requestAnimationFrame( () => {
        if ( !Array.isArray( entries ) || !entries.length ) return
        entries.forEach( entry => {
          const cr = entry.contentRect
          store.bodyWidth.w = Number( cr.width.toFixed( 0 ) )
          store.bodyWidth.h = Number( cr.height.toFixed( 0 ) )
        } )
      } )
    } )

    if ( main.value ) observer.observe( main.value )
    if ( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ) ) {
      window.matchMedia( '(prefers-color-scheme: dark)' )
          .addEventListener( 'change', e => {
            const newColorScheme = e.matches
            changeDarkMode( newColorScheme )
          } )
      changeDarkMode( !!window.matchMedia( '(prefers-color-scheme: dark)' ).matches )
    }
    else {
      changeDarkMode( false )
    }

  }

} )

onBeforeUnmount( () => removeEventListener( 'change', e => changeDarkMode( e.target ) ) )

</script>