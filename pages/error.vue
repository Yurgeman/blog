<template>

  <NuxtLayout name="info">

    <div class="nw-section">
      <div>
        <h1>{{ error.message }}</h1>
        There was an error 😱

        <br>
        <button @click="handleError">
          Clear error
        </button>
        <br>
        <NuxtLink to="/404">
          Trigger another error
        </NuxtLink>
        <br>
        <NuxtLink to="/">
          Navigate home
        </NuxtLink>

      </div>
    </div>

  </NuxtLayout>

</template>

<script lang="ts"
        setup>
import { useStore } from '~/store'

defineProps( { error: Object } )

definePageMeta( { layout: false } )

const handleError = () => clearError( { redirect: '/' } )
const store = useStore()

useHead( {
  titleTemplate: ( title ) => `${ title } | ${ store.config.siteName }`,
  title:         'Ошибка'
  // meta:          [
  //   { name: 'description', content: null },
  //    { name: 'og:title', content: title }
  // ]
} )

</script>