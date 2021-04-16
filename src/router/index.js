import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/Home.vue'
import Field from '@/views/field/Field.vue'
import Venue from '@/views/venue/Venue.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/field',
    component: Field,
  },
  {
    path: '/venue',
    component: Venue,
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

export default router
