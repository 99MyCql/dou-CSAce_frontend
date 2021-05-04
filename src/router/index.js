import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/home/Home.vue'
import Field from '@/views/Field.vue'
import Journal from '@/views/Journal.vue'

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
    name: 'Field',
    path: '/field/:fieldKey',
    component: Field,
    props: true,
  },
  {
    name: 'Journal',
    path: '/journal/:jouKey',
    component: Journal,
    props: true,
  },
  {
    path: '/conference/:key'
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
