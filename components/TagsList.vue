<template>
  <div :class="{ 'nw-tags--small': small }" class="nw-tags">
    <span class="nw-tags__icon" v-html="Tag"></span>
    <div class="nw-tags__list">
      <a v-for="tag in tags" :key="tag" :class="{'nw-tags__item--active': active === tag}" class="nw-tags__item"
         v-text="tag" @click.prevent="click(tag)"></a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tag } from '~/utils/icons'

const route = useRoute()
const router = useRouter()
const emit = defineEmits( [ 'go' ] )
const props = defineProps( {
  tags:   { type: Array, default() {} },
  active: { type: String, default: null },
  small:  { type: Boolean, default: false },
  parent: { type: String, default: null }
} )
const tags = computed( () => props.tags )
const click = ( tag: string ) => {
  emit( 'go', tag )
}
</script>

<style lang="scss">
@import "assets/styles/var";
@import "assets/styles/mixins";

.nw-tags {
  align-items:      center;
  background-color: var(--nw-color-background);
  border-radius:    var(--nw-border-radius);
  display:          flex;
  gap:              var(--nw-margin-xsmall);
  // margin:           0 auto;
  padding:          var(--nw-margin-small);

  &--small {
    max-width: $device-tablet-landscape;
  }

  &__list {
    align-items: center;
    display:     flex;
    flex-wrap:   wrap;
    gap:         var(--nw-margin-xxsmall);
  }

  &__icon, &__item {
    height:      1.2rem;
    line-height: 1.2rem;
  }

  &__icon {
    color:   var(--nw-color-text-muted);
    height:  1.2rem;
    opacity: .6;
    width:   1.2rem;
  }

  &__item {
    border-radius: 500px;
    color:         var(--nw-color-text-muted);
    font-size:     .7rem;
    padding:       0 var(--nw-margin-small);
    white-space:   nowrap;

    &:hover {
      background-color: var(--nw-color-backgroung-muted);
      color:            var(--nw-color-text);
      text-decoration:  none;
    }

    &--active, &--active:hover {
      background-color: var(--nw-color-info);
      color:            var(--nw-color-white);
    }
  }
}
</style>