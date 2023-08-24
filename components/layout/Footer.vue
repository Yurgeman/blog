<template>
  <footer class="nw-footer nw-section  nw-page__footer">

    <div class="nw-footer__content">

      <div class="nw-footer__copyright">
        <small v-text="startYear"></small>
        <span>-</span>
        <small v-text="year"></small>
        ©
        <small v-text="copyRight"></small>
      </div>

    </div>

    <button v-if="showScrollTop" class="nw-footer__to-top" @click="scrollTop()" v-html="ArrowUp"></button>

  </footer>
</template>

<script lang="ts" setup>

import { useStore } from '~/store'
import { scrollToEl } from '~/utils/config'
import { ArrowUp } from '~/utils/icons'

const store = useStore()

const startNavPos = 100
const showScrollTop = ref( false )
const startYear = computed( () => store.config.startYear )
const copyRight = computed( () => store.config.copyRight )
const year = computed( () => {
  const date = new Date()
  return date.getFullYear()
} )

const scrollNav = () => {window.onscroll = () => showScrollTop.value = window.scrollY > startNavPos}

const scrollTop = () => {
  if ( process.client ) {
    const el = document.getElementsByClassName( 'nw-page' )[ 0 ]
    scrollToEl( el )
  }
}

onMounted( () => {
  if ( process.client ) {
    scrollNav()
  }
} )
</script>

<style lang="scss">
@import "assets/styles/var";
@import "assets/styles/mixins";

.nw-footer {
  background-color: var(--nw-color-background);
  border-top:       var(--nw-border-width) solid var(--nw-color-border);
  //box-shadow: inset 0 2rem 4rem var(--nw-color-shadow);

  &__content {
    font-size:  .8rem;
    text-align: center;
  }

  &__copyright {
    color:     var(--nw-color-text-muted);
    grid-area: copyright;

    @media (max-width: $device-tablet-portrait) {
      text-align: center;
    }
  }

  &__to-top {
    align-items:      center;
    background-color: var(--nw-color-info);
    border-radius:    500px;
    bottom:           var(--nw-margin-small);
    color:            var(--nw-color-white);
    display:          flex;
    flex:             none;
    height:           1.8rem;
    justify-content:  center;
    opacity:          .7;
    padding:          0;
    position:         fixed;
    right:            var(--nw-margin-small);
    width:            1.8rem;
    @include transition(opacity, 1s);

    &:hover {
      opacity: 1;
    }

    & > * {
      height: 1.2rem;
      width:  1.2rem;
    }
  }

}
</style>