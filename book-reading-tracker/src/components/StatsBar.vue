<template>
  <div class="stats-bar">
    <span>{{ booksCount }} books and {{ pagesCount }} pages have been read.</span>
  </div>
</template>

<script setup>
const props = defineProps({
  booksCount: {
    type: Number,
    required: true
  },
  pagesCount: {
    type: Number,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.stats-bar {
  width: 100%;
  background: #ede7fe;
  color: #6c63ff;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.75rem 0;
  letter-spacing: 0.2px;
  border-bottom: 1.5px solid #e0d7fa;
}
</style>
