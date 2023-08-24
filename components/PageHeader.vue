<template>
  <div v-if="hero" class="nw-section nw-section--no-padding">
    <div :class="`nw-page-header__${size}`" class="nw-page-header">

      <div v-if="largeImage && bgr" :style="bgr" class="nw-page-header__bgr-img"></div>

      <div :class="{'nw-page-header__body--overlay': largeImage && bgr}" class="nw-page-header__body">
        <h4 class="nw-page-header__title" v-text="title"></h4>
        <p class="nw-page-header__description" v-text="description"></p>

        <button class="nw-page-header__action nw-button nw-button--success nw-button--large"
                v-text="actionLabel"
                @click.prevent="action"></button>
      </div>

      <img v-if="!largeImage && img" :alt="title" :src="img.url" class="nw-page-header__img">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '~/store'

const router = useRouter()
const store = useStore()
const props = defineProps( { hero: { type: Object, default: {} } } )
const img = computed( () => props.hero?.img )
const sizeToFormat = computed( () => store.imageSize )
const {
        largeImage, actionLabel, url, size, title, description
      } = props.hero
const bgr = computed( () => {
  const backgroundImage = img.value?.url
  return ( backgroundImage ) ? { backgroundImage: `url(${ backgroundImage })` } : ''
} )

const action = () => {
  const { url } = props.hero
  if ( !process.client ) return
  if ( url ) {
    const current = document.location.origin
    if ( url.includes( current ) ) {
      router.push( url )
    }
    else {
      window.open( url, '_blank' )
    }
  }

}
</script>

<style lang="scss">
@import "assets/styles/var";
@import "assets/styles/mixins";

$color-from: var(--nw-color-danger);
$color-to:   var(--nw-color-info);

.nw-page-header {
  background:      var(--nw-color-background-muted);
  border-radius:   var(--nw-border-radius);
  display:         flex;
  justify-content: space-between;
  overflow:        hidden;
  position:        relative;

  &__body {
    flex:      1;
    max-width: $device-tablet-portrait;
    min-width: 10rem;
    padding:   var(--nw-margin-xlarge);
    position:  relative;
    z-index:   1;
    @media (max-width: $device-tablet-portrait) {
      padding:    var(--nw-margin-large);
      text-align: center;
    }

    &--overlay {
      background-image: linear-gradient(to right bottom, rgb(65, 127, 252, .2), rgb(255, 58, 65, .4));
      color:            var(--nw-color-white);
      max-width:        none;

      & > * {
        max-width: $device-tablet-portrait;
      }
    }
  }

  &__title {
    font-size:   4rem;
    line-height: 1;
    margin:      0;
    text-align:  left;
    @media (max-width: $device-tablet-portrait) {
      font-size:  3rem;
      text-align: center;
    }
  }

  &__description {
    font-size: 1.2rem;
    margin:    var(--nw-margin) 0 0 0;
    opacity:   .9;
  }

  &__action {
    margin-top: var(--nw-margin-large);
  }

  &__img {
    align-self:   flex-end;
    flex:         none;
    margin-right: var(--nw-margin-large);
    max-height:   calc(100% - var(--nw-margin-large));
    max-width:    calc(100% - var(--nw-margin-xlarge));
    width:        20rem;

    @media (max-width: $device-tablet-landscape) {
      position: absolute;
      right:    var(--nw-margin-large);
      z-index:  0;
    }
  }

  &__bgr-img {
    background:      50% 50% no-repeat;
    background-size: cover;
    @include cover
  }
}

</style>