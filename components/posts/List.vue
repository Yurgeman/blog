<!--
  - Copyright (c) https://github.com/Yurgeman  2023.
  -->

<template>
  <div class="nw-posts">
    <NuxtLink v-for="post in items" :key="post.id" :to="`/post-${post.id}`" class="nw-post">
      <NuxtImg :src="`${imgBaseUrl}${post.title}&background=${color()}`" height="384" loading="lazy" width="800" />
      <h4 class="nw-post__title" v-text="post.title"></h4>
      <div class="nw-post__meta">
        <span v-for="tag in post.tags" class="nw-post__tag" v-text="tag"></span>
      </div>
      <div class="nw-post__meta">
        <div class="nw-post__meta_item">
          <span class="nw-post__icon" v-html="ThumbUp"></span>
          <span v-html="post.reactions "></span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { PostItemType } from '~/types'
import { colors } from '~/utils/helpers'
import { ThumbUp } from '~/utils/icons'

const imgBaseUrl = 'https://appwrite.docsme.ru/v1/avatars/initials?width=800&height=384&name='
const props = defineProps<{ items: PostItemType[] | null }>()
const items = computed( () => props.items || [] )
const colorsClear = colors.map( i => i.substring( 1 ) )
const color = (): string => colorsClear[ Math.floor( Math.random() * colorsClear.length ) ]
</script>

<style lang="scss">
@import "assets/styles/var";

.nw-posts {
  display:               grid;
  grid-gap:              var(--nw-margin);
  grid-template-columns: 1fr 1fr;
  @media (max-width: $device-tablet-portrait) {
    grid-template-columns: 1fr;
  }
}

.nw-post {
  border-radius:  var(--nw-margin);
  box-shadow:     $shadow-small;
  color:          var(--nw-color-text);
  display:        flex;
  flex-direction: column;
  overflow:       hidden;

  &:hover {
    box-shadow:      $shadow-xlarge;
    color:           var(--nw-color-text-emphatic);
    text-decoration: none;
  }

  &__image {
    height:      0;
    max-width:   100%;
    padding-top: calc(100% / 16 * 9);
    width:       100%;
  }

  &__title {
    flex:        1;
    font-size:   1.1rem;
    font-weight: bold;
    line-height: 1.3;
    margin:      0 !important;
    padding:     var(--nw-margin) var(--nw-margin) 0 var(--nw-margin);
    text-align:  left;
  }

  &__meta {
    color:     var(--nw-color-text-muted);
    display:   flex;
    font-size: .8rem;
    gap:       var(--nw-margin-xsmall);
    padding:   var(--nw-margin-small) var(--nw-margin);

    & + .nw-post__meta {
      padding-top: 0;
    }
  }

  &__meta_item {
    align-items: center;
    display:     flex;
    flex:        none;
    gap:         var(--nw-margin-xsmall);
  }

  &__tag {
    background-color: var(--nw-color-background-muted);
    border-radius:    var(--nw-border-radius);
    padding:          0 var(--nw-margin-small);
  }

  &__icon {
    height: 1.3rem;
    width:  1.3rem;
  }
}
</style>