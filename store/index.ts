import { defineStore } from 'pinia'
import { NatItemType, PostGetResponseType, PostItemType, UserType } from '~/types'

export const useStore = defineStore( 'main', {
  state: () => {
    return {
      config:             {
        siteName:        process.env.NUXT_PUBLIC_SITE_NAME,
        sortName:        process.env.NUXT_PUBLIC_SITE_SHORT_NAME,
        sortDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION,
        startYear:       1956,
        theme:           null,
        colors:          null,
        copyRight:       process.env.NUXT_PUBLIC_SITE_COPYRIGHT,
        social:          null
      },
      nav:                <NatItemType[] | []>[],
      body:               {
        scrollPosition: null,
        styles:         null,
        el:             null
      },
      showTopNav:         true,
      showSideBar:        false,
      bodyWidth:          { w: 0, h: 0, r: 0 },
      hideMenuBreakpoint: 1200,
      darkMode:           false,
      logo:               {
        base:     '/logo/logo.svg',
        small:    '/logo/logo_small.svg',
        contrast: '/logo/logo_contrast.svg'
      },
      posts:              <PostGetResponseType>{
        limit: 10,
        posts: <PostItemType [] | []>[],
        skip:  0,
        total: 0
      },
      users:              [],
      userId:             34,
      user:               <UserType | null>null,
      loadingPost:        <boolean>false
    }
  },

  actions: {
    async getUserInfo() {
      this.user = await $fetch( 'https://arecords.store/users/' + this.userId )
    },

    async loadPosts( next: boolean = false, init: boolean = false ): Promise<PostItemType [] | [] | null> {
      this.loadingPost = true
      if ( this.postsAll ) return null
      const resp: PostGetResponseType = await $fetch( 'https://arecords.store/posts', {
        params: { limit: this.posts.limit, skip: this.posts.skip }
      } )
      const { limit, posts, skip, total, message } = resp
      if ( message ) {
        console.log( message )
        this.loadingPost = false
      }
      else {
        const getSkip = (): number => {
          if ( init ) {
            return 0
          }
          else if ( !this.postsAll ) {
            return ( next ) ? skip + limit : skip - limit
          }
          else {
            return ( next ) ? skip + limit : skip - limit
          }
        }
        this.posts.limit = limit
        this.posts.posts = posts
        this.posts.skip = getSkip()
        this.posts.total = total
        this.loadingPost = false
      }
      return posts
    }
  },

  getters: {
    social:    ( state ) => state.config.social,
    width:     ( state ) => state.bodyWidth.w,
    device:    ( state ) => {
      if ( !state.bodyWidth ) return 'desktop'
      const width = state.bodyWidth.w
      if ( width <= 480 ) {return 'phone'}
      else if ( width > 480 && width <= 640 ) {return 'tablet-small'}
      else if ( width > 640 && width <= 768 ) {return 'tablet-portrait'}
      else if ( width > 768 && width <= 1024 ) {return 'tablet-landscape'}
      else if ( width > 1024 && width <= 1200 ) {return 'desktop'}
      else if ( width > 1200 ) {return 'desktop-large'}
    },
    imageSize: ( state ) => {
      if ( !state.bodyWidth ) return null
      const width = state.bodyWidth.w
      if ( width <= 400 ) {return 'xsmall'}
      else if ( width > 400 && width <= 768 ) {return 'small'}
      else if ( width > 768 && width <= 1024 ) {return 'medium'}
      else if ( width > 1200 ) {return 'large'}
    },
    postsAll:  ( state ) => state.posts.total !== 0 && state.posts.total - state.posts.skip < state.posts.limit
  }
} )