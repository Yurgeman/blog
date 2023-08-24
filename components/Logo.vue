<template>

  <span v-if="isHome"
        class="nw-logo">
    <img :alt="title"
         :src="logo"
         :style="{height: `${size}px`}"
         class="nw-logo__image">
  </span>

  <NuxtLink v-else
            class="nw-logo"
            to="/">
    <img :alt="title"
         :src="logo"
         :style="{height: `${size}px`}"
         class="nw-logo__image">
  </NuxtLink>
</template>

<script lang="ts"
        setup>
import { useStore } from '~/store'

const store = useStore()
const route = useRoute()

const props = defineProps( {
  title:    { type: String, default: null },
  size:     { type: Number, default: 50 },
  contrast: { type: Boolean, default: false },
  full:     { type: Boolean, default: true }
} )

const logoImg = computed( () => store.logo )
const isHome = computed( () => route.path === '/' )
const logo = computed( () => ( props.full )
                             ? ( props.contrast ) ? logoImg.value.contrast : logoImg.value.base
                             : logoImg.value.small
)

</script>

<style lang="scss">
@import "assets/styles/mixins";

.nw-logo {
  @include transitionAll();
  transform-origin: center;

  &:hover {
    opacity: .8
  }

  &__image {
    max-width: none;
    width:     auto;
  }
}
</style>