<template>
  <NuxtLayout name="info">
    <div class="nw-section nw-section--medium">

      <div v-if="complete" class="nw-flex nw-flex--column nw-flex--gap">
        <h1 class="nw-section__title">Статья добавлена</h1>
      </div>

      <div v-else class="nw-flex nw-flex--column nw-flex--gap">
        <h1 class="nw-section__title">{{ title }}</h1>

        <form class="nw-flex nw-flex--column nw-flex--gap">
          <div>
            <label>Заголовок статьи *</label>
            <input v-model="newPost.title"
                   :class="{
                      'nw-input--danger': !newPostValid.title,
                      'nw-input--success': newPostValid.title,
                    }" :disabled="disabled"
                   class="nw-input" placeholder="Название Вашей статьи" />
          </div>
          <div>
            <label>Текст статьи *</label>
            <textarea v-model="newPost.body" :class="{
                        'nw-input--danger': !newPostValid.body,
                        'nw-input--success': newPostValid.body,
                       }" :disabled="disabled"
                      class="nw-textarea"
                      placeholder="Текст Вашей статьи"></textarea>
          </div>
          <div>
            <button :disabled="disabled || !valid" class="nw-button nw-button--success" @click="addPost()">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>

  </NuxtLayout>

</template>

<script lang="ts" setup>
import { useStore } from '~/store'
import { PostItemType } from '~/types'

defineProps( { error: Object } )
definePageMeta( { layout: false } )

const store = useStore()
const complete = ref( false )
const disabled = ref( false )
const { title, description } = { title: 'Добавить статью', description: 'Добавить новую статью в блок' }
const newPost = reactive<PostItemType>( {
  title:  '',
  body:   '',
  userId: store.userId
} )
const newPostValid = computed( () => {
  return { title: newPost.title.length > 5, body: newPost.body.length > 20 }
} )
const valid = computed( () => newPostValid.value.title && newPostValid.value.body )

const addPost = async () => {
  disabled.value = true
  const resp = await $fetch( `https://arecords.store/posts/add`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify( newPost )
  } )
  const { message, title } = resp
  if ( message ) {
    disabled.value = false
    alert( message )
  }
  else {
    complete.value = true
  }
}

useHead( {
  titleTemplate: ( title ) => `${ title } | ${ store.config.siteName }`,
  title,
  meta:          [
    { name: 'description', content: description },
    { name: 'og:title', content: title }
  ]
} )

</script>