import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Field from '@/views/Field.vue'
import Journal from '@/views/Journal.vue'
import ConfSeries from '@/views/ConfSeries.vue'
import Author from '@/views/Author.vue'

const routes = [
  {
    path: '/',
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
    name: 'ConfSeries',
    path: '/confSeries/:confSerKey',
    component: ConfSeries,
    props: true,
  },
  {
    name: 'Author',
    path: '/author/:authorKey',
    component: Author,
    props: true,
  },
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
