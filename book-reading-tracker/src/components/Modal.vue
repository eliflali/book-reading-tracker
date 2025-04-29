<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <button class="modal-close" @click="emit('close')" aria-label="Close">&times;</button>
      <slot />
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(44, 44, 44, 0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.modal-content {
  background: var(--bg-primary, #fff);
  color: var(--text-primary, #222);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 95vw;
  min-height: 100px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text-secondary, #888);
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;
  &:hover {
    color: var(--error-color, #e74c3c);
  }
}
.dark-mode .modal-content {
  background: #23232b;
  color: #f3f3f3;
}
.dark-mode .modal-overlay {
  background: rgba(10,10,20,0.7);
}
</style> 