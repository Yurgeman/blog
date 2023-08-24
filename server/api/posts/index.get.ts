/*
 * Copyright (c) https://github.com/Yurgeman  2023.
 */

import { H3Event } from 'h3'
import { PostGetResponseType } from '~/types'

export default defineEventHandler( async ( event: H3Event ) => {
  const url = process.env.NUXT_PUBLIC_API_URL + '/posts'
  const resp = await <Promise<PostGetResponseType[] | any>>await $fetch( url )
  console.log( 'resp', resp )
} )