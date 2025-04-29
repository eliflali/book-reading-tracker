import { ref, watch } from 'vue'
import { useStorage } from '@vueuse/core'

export function useBooks() {
  const books = useStorage('books', [])
  const favorites = useStorage('favorites', [])

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    books.value = [...books.value, newBook]
  }

  const deleteBook = (bookId) => {
    books.value = books.value.filter(book => book.id !== bookId)
    // Remove from favorites if it was favorited
    favorites.value = favorites.value.filter(id => id !== bookId)
  }

  const toggleFavorite = (bookId) => {
    const index = favorites.value.indexOf(bookId)
    if (index === -1) {
      favorites.value = [...favorites.value, bookId]
    } else {
      favorites.value = favorites.value.filter(id => id !== bookId)
    }
  }

  const getBookById = (bookId) => {
    return books.value.find(book => book.id === bookId)
  }

  const updateBook = (bookId, updates) => {
    books.value = books.value.map(book => 
      book.id === bookId ? { ...book, ...updates } : book
    )
  }

  return {
    books,
    favorites,
    addBook,
    deleteBook,
    toggleFavorite,
    getBookById,
    updateBook
  }
} 