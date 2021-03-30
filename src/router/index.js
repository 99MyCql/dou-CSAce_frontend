import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/home/Home.vue'
import Field from '@/views/field/Field.vue'

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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
