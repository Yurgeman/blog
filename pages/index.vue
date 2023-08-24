<template>
  <NuxtLayout name="info">
    <div class="nw-section nw-section--medium">
      <div class="nw-flex nw-flex--column nw-flex--gap">
        <h1 class="nw-section__title">{{ title }}</h1>
        <h3>{{ subTitle }}</h3>

        <LazyPostsList :items="posts" />

        <div v-if="posts?.length" class="nw-button-group nw-button-group--pill">
          <button :disabled="postsStart" class="nw-button" @click="getPosts(false)">назад</button>
          <button :disabled="postsEnd" class="nw-button" @click="getPosts(true)">дальше</button>
        </div>

        <transition appear mode="out-in" name="fade">
          <Loader v-if="loading" :size="3" />
        </transition>
      </div>
    </div>

  </NuxtLayout>

</template>

<script lang="ts" setup>
import { useStore } from '~/store'
import { PostItemType } from '~/types'

defineProps( { error: Object } )
definePageMeta( { layout: false } )

const store = useStore()
const runtimeConfig = useRuntimeConfig()
const url = computed<string>( () => runtimeConfig.public.apiUrl + '/posts' )
const posts = computed<PostItemType[] | []>( () => store.posts.posts || [] )
const { title, subTitle, description } = {
  title: 'Блог о прекрасном', subTitle: 'subTitle', description: 'description'
}

const loading = computed( () => store.loadingPost )
const postsStart = computed( () => store.posts.skip === 0 )
const postsEnd = computed( () => store.postsAll )

const getPosts = async ( next: boolean = true, init: boolean = false ) => await store.loadPosts( next )

await getPosts( true, true )

useHead( {
  titleTemplate: ( title ) => `${ title } | ${ store.config.siteName }`,
  title,
  meta:          [
    { name: 'description', content: description },
    { name: 'og:title', content: title }
  ]
} )

</script>