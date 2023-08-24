/*
 * Copyright (c) https://github.com/Yurgeman  2023.
 */

export interface PostItemType {
  id?: number
  title: string
  body: string
  userId?: number
  tags?: string[],
  reactions?: number
}

export interface UserType {
  id: number
  firstName: string
  lastName: string
  username: string
  image: string
}

export interface PostGetResponseType {
  posts: PostItemType[] | []
  total: number
  skip: number
  limit: number
  message?: string
}