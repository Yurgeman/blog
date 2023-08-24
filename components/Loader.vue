<!--
  - Copyright (c) https://github.com/Yurgeman  2023.
  -->

<template>
  <aside class="nw-loader">
    <span :style="{'width': loaderSize, 'height': loaderSize}" v-html="LoadingIndicator"></span>
  </aside>
</template>

<script lang="ts" setup>
import { LoadingIndicator } from '~/utils/icons'

const props = defineProps<{ size?: number }>()
const loaderSize = computed( () => ( props.size ) ? props.size + 'rem' : '1rem' )
</script>

<style lang="scss">
.nw-loader {
  align-items:     center;
  color:           var(--nw-color-danger);
  display:         flex;
  justify-content: center;
  padding:         3rem;

  svg {
    height: 100%;
    width:  100%;
  }
}
</style>