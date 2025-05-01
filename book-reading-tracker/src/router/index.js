import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', name: 'Books', component: BookListView },
  { path: '/about', name: 'About', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
