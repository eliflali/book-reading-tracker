<template>
  <header class="header">
    <div class="header__left">
      <img src="../assets/logo.png" alt="Bookapp Logo" class="header__logo" />
      <span class="header__appname">Bookapp</span>
    </div>
    <nav class="header__nav">
      <router-link to="/about" class="header__nav-link">About</router-link>
      <router-link to="/" class="header__nav-link">Books</router-link>
    </nav>
    <div class="header__right">
      <button class="header__btn header__btn--primary" @click="$emit('open-book-form')">Add book form</button>
      <button class="header__btn header__btn--secondary">Login</button>
      <button class="header__btn header__btn--icon" @click="$emit('toggle-theme')" :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
        <span v-if="isDarkMode">☀️</span>
        <span v-else>🌙</span>
      </button>
    </div>
  </header>
</template>

<script setup>
defineProps({
  isDarkMode: Boolean
});
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  left: 0;
  right: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem 1.5rem 2rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-bottom: 1.5px solid var(--border-color);
  min-height: 72px;

  &__left {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.75rem;
  }
  &__logo {
    width: 32px;
    height: 32px;
  }
  &__appname {
    font-weight: 700;
    font-size: 1.25rem;
    color: #2d2d2d;
    letter-spacing: 0.5px;
  }
  &__nav {
    display: flex;
    gap: 2rem;
    margin-left: 2rem;
    a {
      color: #6c6c6c;
      font-weight: 500;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.2s;
      &:hover {
        color: #4a90e2;
      }
    }
  }
  &__right {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  &__btn {
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    &--primary {
      background: #6c63ff;
      color: #fff;
      transition: background-color 0.2s;
      &:hover {
        background: #5a52e0;
      }
    }
    &--secondary {
      background: #fff;
      color: #6c63ff;
      border: 1.5px solid #6c63ff;
      transition: all 0.2s;
      &:hover {
        background: #6c63ff;
        color: #fff;
      }
    }
    &--icon {
      background: none;
      color: #6c63ff;
      font-size: 1.5rem;
      padding: 0.5rem;
      border: none;
      border-radius: 50%;
      transition: background 0.2s;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
@media (max-width: 600px) {
  .header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    &__nav {
      margin-left: 0;
      gap: 1rem;
    }
  }
}
</style> 