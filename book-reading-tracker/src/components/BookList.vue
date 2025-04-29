<template>
  <div class="book-list">
    <div class="controls">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by title or author..."
          class="search-input"
        />
      </div>
      <div class="filters">
        <select v-model="statusFilter" class="filter-select">
          <option value="">All Books</option>
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
        </select>
        <button
          class="toggle-favorites"
          :class="{ active: showFavorites }"
          @click="showFavorites = !showFavorites"
        >
          Favorites
        </button>
      </div>
    </div>

    <div class="summary" v-if="filteredBooks.length">
      <p>Showing {{ filteredBooks.length }} of {{ totalBooks }} books</p>
      <div class="status-summary">
        <span class="to-read">{{ statusCounts["to-read"] || 0 }} to read</span>
        <span class="reading">{{ statusCounts["reading"] || 0 }} reading</span>
        <span class="completed"
          >{{ statusCounts["completed"] || 0 }} completed</span
        >
      </div>
    </div>

    <div class="books-container">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="book-card"
      >
        <img
          class="book-cover"
          src="../assets/placeholder.png"
          alt="Book cover placeholder"
        />
        <BookItem
          :book="book"
          :is-favorite="favorites.includes(book.id)"
          @toggle-favorite="toggleFavorite"
          @delete-book="deleteBook"
        />
      </div>
    </div>

    <p v-if="!filteredBooks.length" class="no-books">
      No books found. Add some books to get started!
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BookItem from "./BookItem.vue";

const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
  favorites: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["toggle-favorite", "delete-book"]);

const searchQuery = ref("");
const statusFilter = ref("");
const showFavorites = ref(false);

const filteredBooks = computed(() => {
  return props.books.filter((book) => {
    const matchesSearch =
      searchQuery.value === "" ||
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "" || book.status === statusFilter.value;
    const matchesFavorites =
      !showFavorites.value || props.favorites.includes(book.id);

    return matchesSearch && matchesStatus && matchesFavorites;
  });
});

const totalBooks = computed(() => props.books.length);

const statusCounts = computed(() => {
  return props.books.reduce((acc, book) => {
    acc[book.status] = (acc[book.status] || 0) + 1;
    return acc;
  }, {});
});

const toggleFavorite = (bookId) => {
  emit("toggle-favorite", bookId);
};

const deleteBook = (bookId) => {
  emit("delete-book", bookId);
};
</script>

<style lang="scss" scoped>
.book-list {
  width: 100%;
  margin: 0 auto;
  padding: 1rem 0;

  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;

    .search-box {
      flex: 1;
      min-width: 200px;

      .search-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;

        &:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
        }
      }
    }

    .filters {
      display: flex;
      gap: 0.5rem;

      .filter-select {
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        cursor: pointer;
      }

      .toggle-favorites {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        &:hover {
          background: var(--bg-secondary);
        }
      }
    }
  }

  .summary {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;

    p {
      margin: 0 0 0.5rem 0;
      color: var(--text-secondary);
    }

    .status-summary {
      display: flex;
      gap: 1rem;
      font-size: 0.9rem;

      span {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;

        &.to-read {
          background: var(--status-to-read);
        }

        &.reading {
          background: var(--status-reading);
        }

        &.completed {
          background: var(--status-completed);
        }
      }
    }
  }

  .books-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .book-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--bg-secondary);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    min-height: 320px;
    min-width: 0;
    position: relative;
    transition: box-shadow 0.2s;
    &:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    }
  }

  .book-cover {
    width: 100%;
    max-width: 120px;
    height: 160px;
    object-fit: contain;
    margin-bottom: 1rem;
    border-radius: 6px;
    background: #eaeaea;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }

  .no-books {
    text-align: center;
    color: var(--text-secondary);
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    grid-column: 1 / -1;
  }
}

@media (max-width: 1100px) {
  .book-list .books-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .book-list .books-container {
    grid-template-columns: 1fr;
  }
}
</style> 