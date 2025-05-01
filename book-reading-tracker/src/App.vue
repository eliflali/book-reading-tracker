<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <Notification
      :show="showNotification"
      :message="notificationMessage"
      :type="notificationType"
    />
    <Header
      :isDarkMode="isDarkMode"
      @open-book-form="showBookForm = true"
      @toggle-theme="toggleTheme"
    />
    <StatsBar :books-count="books.length" :pages-count="totalPages" />

    <Modal v-if="showBookForm" @close="showBookForm = false">
      <BookForm @add-book="handleAddBook" />
    </Modal>

    <main class="app-main">
      <div class="container">
        <router-view />
      </div>
    </main>

    <footer class="app-footer">
      <p>Book Reading Tracker - Elif LALE</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Header from "./components/Header.vue";
import StatsBar from "./components/StatsBar.vue";
import Modal from "./components/Modal.vue";
import BookForm from "./components/BookForm.vue";
import BookList from "./components/BookList.vue";
import { useBooks } from "./composables/useBooks";
import { useStorage } from "@vueuse/core";
import Notification from "./components/Notification.vue";

const { books, favorites, addBook, deleteBook, toggleFavorite } = useBooks();
const isDarkMode = useStorage("dark-mode", false);
const showBookForm = ref(false);

const totalPages = computed(() =>
  books.value.reduce((sum, book) => sum + (book.pages || 0), 0)
);

const notificationMessage = ref("");
const notificationType = ref("success");
const showNotification = ref(false);

const handleAddBook = (book) => {
  addBook(book);
  showBookForm.value = false;
  triggerNotification("Book has been successfully added", "success");
};

const handleDeleteBook = (bookId) => {
  deleteBook(bookId);
  triggerNotification("Book has been successfully removed from list", "success");
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

watch(isDarkMode, (val) => {
  document.body.classList.toggle("dark-mode", val);
});

onMounted(() => {
  document.body.classList.toggle("dark-mode", isDarkMode.value);
});

function triggerNotification(message, type = "success") {
  notificationMessage.value = message;
  notificationType.value = type;
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
  }, 2500);
}
</script>

<style lang="scss">
:root {
  // Light theme
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --primary-color: #4a90e2;
  --primary-color-dark: #357abd;
  --primary-color-rgb: 74, 144, 226;
  --error-color: #e74c3c;
  --status-to-read: #f1c40f;
  --status-reading: #2ecc71;
  --status-completed: #3498db;
}

.dark-mode {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --border-color: #404040;
  --primary-color: #5d9cec;
  --primary-color-dark: #4a89dc;
  --primary-color-rgb: 93, 156, 236;
  --error-color: #e74c3c;
  --status-to-read: #f1c40f;
  --status-reading: #2ecc71;
  --status-completed: #3498db;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, .app {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .theme-toggle {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background: var(--bg-primary);
    }
  }
}

.app-main {
  flex: 1;
  width: 100%;
  padding: 2rem 0;
  position: relative;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}

.app-footer {
  padding: 1rem;
  width: 100%;
  text-align: center;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .app-header {
    padding: 0.75rem;

    h1 {
      font-size: 1.25rem;
    }
  }

  .app-main {
    padding: 1rem 0;
  }
}
</style>
