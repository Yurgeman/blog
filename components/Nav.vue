<template>
  <nav :class="className" class="nw-nav">
    <ul>
      <li v-for="link in nav" :key="link.id">
        <NuxtLink :class="{ 'nw-nav__item--contrast': contrast }" :to="link.path" class="nw-nav__item"
                  v-text="link.title" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { useStore } from '~/store'
import { NatItemType } from '~/types'

const store = useStore()
const props = defineProps( {
  contrast:  { type: Boolean, default: false },
  className: { type: String }
} )

const contrast = computed( () => props.contrast )
const nav = computed<NatItemType[] | []>( () => store.nav )

</script>

<style lang="scss">
.nw-nav {
  display:         flex;
  justify-content: center;

  ul { list-style: none}

  ul, li {
    margin:  0;
    padding: 0;
  }

  li {
    position: relative;
  }

  a {
    &:hover {
      text-decoration: none;
    }
  }
}

.nw-nav__item {

  &--contrast {
    color: var(--nw-color-primary-400);

    &:hover {
      color: var(--nw-color-primary-100);
    }
  }
}
</style>