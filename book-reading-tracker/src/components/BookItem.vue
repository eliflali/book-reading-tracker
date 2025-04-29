<template>
  <div class="book-item" :class="{ favorite: isFavorite }">
    <div class="book-content">
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-author" v-if="book.author">{{ book.author }}</p>
      <div class="book-meta">
        <span class="status" :class="book.status">{{
          formatStatus(book.status)
        }}</span>
        <span class="pages" v-if="book.pages">{{ book.pages }} pages</span>
      </div>
    </div>
    <div class="book-actions">
      <button
        class="favorite-btn"
        @click="toggleFavorite"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span class="icon">{{ isFavorite ? "★" : "☆" }}</span>
      </button>
      <button
        class="delete-btn"
        @click="$emit('delete-book', book.id)"
        title="Delete book"
      >
        <span class="icon">🗑️</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-favorite", "delete-book"]);

const formatStatus = (status) => {
  const statusMap = {
    "to-read": "To Read",
    reading: "Reading",
    completed: "Completed",
  };
  return statusMap[status] || status;
};

const toggleFavorite = () => {
  emit("toggle-favorite", props.book.id);
};
</script>

<style lang="scss" scoped>
.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &.favorite {
    border-left: 4px solid var(--primary-color);
  }

  .book-content {
    flex: 1;

    .book-title {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
      font-size: 1.1rem;
    }

    .book-author {
      margin: 0 0 0.5rem 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .book-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;

      .status {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        background: var(--bg-primary);
        color: var(--text-primary);

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

      .pages {
        color: var(--text-secondary);
      }
    }
  }

  .book-actions {
    display: flex;
    gap: 0.5rem;

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background: var(--bg-primary);
      }

      .icon {
        font-size: 1.2rem;
      }
    }

    .favorite-btn {
      color: var(--primary-color);
    }

    .delete-btn {
      color: var(--error-color);
    }
  }
}
</style>
