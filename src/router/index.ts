import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import CuacaPage from '@/views/CuacaPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/cuaca'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/cuaca',
    name: 'Cuaca',
    component: CuacaPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
