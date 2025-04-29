<template>
  <transition name="fade">
    <div v-if="show" :class="['notification', type]">
      <span class="icon">
        <template v-if="type === 'success'"></template>
        <template v-else-if="type === 'error'"></template>
        <template v-else>ℹ️</template>
      </span>
      <span class="message">{{ message }}</span>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: {
    type: String,
    default: 'success'
  }
});
</script>

<style scoped>
.notification {
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  background: #e6faf2;
  color: #1a7f37;
  font-weight: 500;
  font-size: 1.1rem;
  border-bottom: 2px solid #b2f2d7;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.notification.success {
  background: #e6faf2;
  color: #1a7f37;
  border-bottom: 2px solid #b2f2d7;
}
.notification.error {
  background: #ffeaea;
  color: #c0392b;
  border-bottom: 2px solid #ffb3b3;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.icon {
  font-size: 1.3rem;
}
</style>
