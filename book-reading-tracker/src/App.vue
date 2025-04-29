<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <h1>Book Reading Tracker</h1>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDarkMode ? "☀️" : "🌙" }}
      </button>
    </header>

    <main class="app-main">
      <div class="container">
        <BookForm @add-book="addBook" />
        <BookList
          :books="books"
          :favorites="favorites"
          @toggle-favorite="toggleFavorite"
          @delete-book="deleteBook"
        />
      </div>
    </main>

    <footer class="app-footer">
      <p>© 2024 Book Reading Tracker</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BookForm from "./components/BookForm.vue";
import BookList from "./components/BookList.vue";
import { useBooks } from "./composables/useBooks";
import { useStorage } from "@vueuse/core";

const { books, favorites, addBook, deleteBook, toggleFavorite } = useBooks();
const isDarkMode = useStorage("dark-mode", false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

onMounted(() => {
  // Apply dark mode class to body for better styling
  document.body.classList.toggle("dark-mode", isDarkMode.value);
});
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

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background-color 0.3s, color 0.3s;
}

.app {
  min-height: 100vh;
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
  padding: 2rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
}

.app-footer {
  padding: 1rem;
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
