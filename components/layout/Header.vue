<template>
  <header ref="header" class="nw-header nw-page__header">

    <div :class="{ 'nw-header__navbar--sticky': sticky }" class="nw-header__navbar">

      <div ref="inner" :class="{'nw-header__navbar-inner--mobile': !showNav}" class="nw-header__navbar-inner">

        <div v-if="!showNav" class="nw-header__navbar-side">
          <span class="nw-header__act" role="button" v-html="Menu"></span>
        </div>

        <Logo :contrast="darkMode" :size="logoSize" />

        <Nav v-if="showNav" :drop="false" class="nw-header__nav" />

        <div class="nw-header__navbar-side">
          <span class="nw-header__act" @click="add()" v-html="AddDoc" />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useStore } from '~/store'
import { AddDoc, Menu } from '~/utils/icons'
import { showOnDevices } from '~~/utils/config'

const store = useStore()
const router = useRouter()
const inner = ref( null )
const startNavPos = 400
const sticky = ref( false )
const logoSize = computed( () => ( store.device === 'phone' ) ? 30 : 40 )
const darkMode = computed( () => store.darkMode )
const showNav = computed( () => showOnDevices( [ 'desktop-large' ], store.device ) )
const add = async () => await router.push( '/add-post' )
onMounted( () => {
  if ( process.client ) {
    window.onscroll = () => sticky.value = window.scrollY > startNavPos
  }
} )

</script>

<style lang="scss">
@import "assets/styles/var";
@import "assets/styles/mixins";

:root {
  --navbar-size: 100px;
}

@media (max-width: $device-tablet-landscape) {
  :root {
    --navbar-size: 70px;
  }
}

.nw-header {
  min-height: var(--navbar-size);

  &__link {
    color:       var(--nw-color-link);
    white-space: nowrap;

    &:hover {
      color: var(--nw-color-link-hover);
    }
  }

  &__navbar {
    align-items:     center;
    background-size: 200% 200%;
    display:         flex;
    height:          var(--navbar-size);
    padding:         0 var(--nw-margin);
    position:        relative;
    width:           100vw;
    z-index:         10;
    //background-color: var(--nw-color-background);
    //@include transition(all, 1s);

    @media (max-width: $device-desktop) {
      padding: 0 var(--nw-margin);
    }

    &--large {
      position: absolute;
    }

    &--sticky {
      background-color: var(--nw-color-background-emphatic);
      box-shadow:       $shadow-large;
      left:             0;
      position:         fixed;
      right:            0;
      top:              0;
      z-index:          2000;
    }
  }

  &__navbar-inner {
    align-items: center;
    //overflow: hidden;
    display:     flex;
    gap:         var(--nw-margin);
    margin:      0 auto;
    max-width:   $device-desktop;
    width:       100%;

    &--mobile {
      display:               grid;
      grid-template-columns: 1fr auto 1fr;
    }
  }

  &__navbar-side {
    align-items: center;
    display:     flex;
    gap:         var(--nw-margin);

    &:last-child {
      justify-content: flex-end;
    }
  }

  &__nav {
    flex: 1;

    ul {
      display: flex;
      gap:     var(--nw-margin-xsmall);
    }

    .nw-nav__item {
      border-radius: 500px;
      color:         var(--nw-color-link);
      //border: var(--nw-border-width) solid transparent;
      padding:       var(--nw-margin-small) var(--nw-margin);
      white-space:   nowrap;

      &:hover {
        background-color: var(--nw-color-link-hover);
        color:            var(--nw-color-white);
      }

      &.nuxt-link-exact-active {
        background-color: var(--nw-color-success);
        border-color:     var(--nw-color-success);
        color:            var(--nw-color-success-100);
      }
    }
  }

  &__act {
    color:  var(--nw-color-link);
    cursor: pointer;
    height: 1.4rem;
    @include transitionAll;
    width:  1.4rem;

    svg {
      stroke-width: 2;
    }

    @media (max-width: $device-tablet-portrait) {

      //width: 1.2rem;
      //height: 1.2rem;
    }
    //@media (max-width: $device-phone) {
    //  width: 1rem;
    //  height: 1rem;
    //}

    &:hover {
      color:     var(--nw-color-warning-500);
      transform: scale(.8);
    }
  }
}

@keyframes bgr {
  0% {background-position: 0% 50%}
  50% {background-position: 100% 50%}
  100% {background-position: 0% 50%}
}

@keyframes scroll {
  0% {transform: translate(-50%, .2rem);}
  50% {transform: translate(-50%, 0);}
  100% {transform: translate(-50%, .2rem);}
}

</style>