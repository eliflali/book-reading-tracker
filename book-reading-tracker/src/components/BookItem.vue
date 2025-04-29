<template>
  <div class="book-item" :class="{ favorite: isFavorite }">
    <div class="book-grid">
      <h3 class="book-title">{{ book.title }}</h3>
      <div class="book-actions">
        <button
          class="favorite-button"
          @click="toggleFavorite"
          :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
        >
          <span class="icon">{{ isFavorite ? "★" : "☆" }}</span>
        </button>
        <button
          class="delete-button"
          @click="$emit('delete-book', book.id)"
          title="Delete book"
        >
          <span class="icon">🗑️</span>
        </button>
      </div>
      <p class="book-author" v-if="book.author">{{ book.author }}</p>
      <span class="pages" v-if="book.pages">{{ book.pages }} pages</span>
      <span class="status" :class="book.status">{{ formatStatus(book.status) }}</span>
    </div>
    
    <!-- Update Book Modal -->
    <div v-if="showUpdateModal" class="modal-overlay" @click="closeUpdateModal">
      <div class="modal-content" @click.stop>
        <UpdateBookForm
          :book="book"
          @update-book="handleUpdateBook"
          @close-modal="closeUpdateModal"
        />
      </div>
    </div>
    <button
      class="update-info-btn"
      @click="openUpdateModal"
      title="Update book info"
    >
      Update info
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UpdateBookForm from "./UpdateBookForm.vue";

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

const emit = defineEmits(["toggle-favorite", "delete-book", "update-book"]);

const showUpdateModal = ref(false);

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

const openUpdateModal = () => {
  showUpdateModal.value = true;
};

const closeUpdateModal = () => {
  showUpdateModal.value = false;
};

const handleUpdateBook = (updatedBook) => {
  emit("update-book", updatedBook);
  closeUpdateModal();
};
</script>

<style lang="scss" scoped>
.book-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  position: relative;

  &.favorite {
    border-left: 4px solid var(--primary-color);
  }

  .book-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "title actions"
      "author pages"
      "status status";
    gap: 0.5rem 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .book-title {
    grid-area: title;
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
  }

  .book-actions {
    grid-area: actions;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 0;
  }

  .book-author {
    grid-area: author;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .pages {
    grid-area: pages;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .status {
    grid-area: status;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: var(--bg-primary);
    color: var(--text-primary);
    font-size: 0.85rem;
    justify-self: start;
  }

  .update-info-btn {
    width: 100%;
    background: #6c63ff;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 0.75rem 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: background 0.2s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.04);
    &:hover {
      background: #5a52e0;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 1rem;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
