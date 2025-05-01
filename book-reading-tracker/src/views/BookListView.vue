<script setup>
import BookList from '../components/BookList.vue'
import { useBooks } from '../composables/useBooks'

const { books, favorites, toggleFavorite, deleteBook } = useBooks()
</script>

<template>
  <BookList
    :books="books"
    :favorites="favorites"
    @toggle-favorite="toggleFavorite"
    @delete-book="deleteBook"
  />
</template>
