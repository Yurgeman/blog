<template>

  <NuxtLayout name="info">
    <div class="nw-section nw-section--medium">
      <main class="nw-article">

        <!--title-->
        <h1 class="nw-article__title">
          <NuxtLink to="/" v-html="ArrowLeft"></NuxtLink>
          <span v-text="page.title"></span>
        </h1>

        <!--TagsList-->
        <TagsList :small="true" :tags="page.tags" parent="/" />

        <NuxtImg :src="`${imgBaseUrl}${page.title}&background=${color()}`" class="nw-article__poster" height="500"
                 loading="lazy" width="1200" />

        <div v-html="content"></div>
      </main>
    </div>

  </NuxtLayout>

</template>

<script lang="ts" setup>

import { useStore } from '~/store'
import { PostItemType } from '~/types'
import { colors } from '~/utils/helpers'
import { ArrowLeft } from '~/utils/icons'

definePageMeta( { layout: false } )
const imgBaseUrl = 'https://appwrite.docsme.ru/v1/avatars/initials?width=1200&height=500&name='
const store = useStore()
const route = useRoute()
const path = ref( route.path )
const slug = ref( route.params?.slug )
const colorsClear = colors.map( i => i.substring( 1 ) )
const color = (): string => colorsClear[ Math.floor( Math.random() * colorsClear.length ) ]

const contentResp = await useFetch( 'https://fish-text.ru/get', {
  params: { type: 'paragraph', number: 10, format: 'html' }
} )
const pageResp = await useFetch( `https://arecords.store/posts/${ slug.value }` )
const content = computed( () => contentResp?.data.value )
const page = reactive<PostItemType>( {
  id:        pageResp.data.value?.id,
  title:     pageResp.data.value?.title,
  body:      pageResp.data.value?.body,
  tags:      pageResp.data.value?.tags,
  userId:    pageResp.data.value?.userId,
  reactions: pageResp.data.value?.reactions
} )

useHead( {
  titleTemplate: ( title ) => `${ title } | ${ store.config.siteName }`,
  title:         page.title,
  meta:          [ { name: 'description', content: page.body }, { name: 'og:title', content: page.title } ]
} )

</script>

<style lang="scss">
.nw-article {
  display:        flex;
  flex-direction: column;
  gap:            var(--nw-margin-small);

  &__title {
    display:       flex;
    gap:           var(--nw-margin-small);
    margin:        0;
    margin-bottom: var(--nw-margin);
    text-align:    left;
  }

  &__poster {
    border-radius:   calc(var(--nw-border-radius) * 3);
    display:         flex;
    justify-content: center;
    margin:          var(--nw-margin) auto;
  }
}
</style>