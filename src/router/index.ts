import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import CryptoPage from '@/views/CryptoPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/crypto'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/crypto',
    name: 'Crypto',
    component: CryptoPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
