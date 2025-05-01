<template>
  <div class="about-page">
    <h1>About Bookapp</h1>
    <p>
      Bookapp is a simple and elegant web application to help you track your reading journey.
      Add books, update their status, mark favorites, and filter your collection—all with a clean, intuitive interface.
    </p>
    <ul>
      <li>📚 Add, update, and delete books</li>
      <li>⭐ Mark books as favorites</li>
      <li>🔍 Search and filter your collection</li>
      <li>🌓 Dark mode support</li>
      <li>💾 Data persistence with LocalStorage</li>
      <li>📱 Responsive design</li>
    </ul>
    <p>
      Built with <b>Vue 3</b> and the Composition API.<br>
      <a href="https://github.com/eliflale/book-reading-tracker" target="_blank">View on GitHub</a>
    </p>
  </div>
</template>

<script setup>
// No script needed for static About page
</script>

<style scoped>
.about-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--bg-secondary, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.about-page h1 {
  margin-bottom: 1rem;
  color: var(--primary-color, #6c63ff);
}
.about-page ul {
  margin: 1rem 0 1.5rem 1.5rem;
  padding: 0;
}
.about-page li {
  margin-bottom: 0.5rem;
}
.about-page a {
  color: var(--primary-color, #6c63ff);
  text-decoration: underline;
}
</style>
