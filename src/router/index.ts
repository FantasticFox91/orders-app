import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import { useAuthStore } from '@/stores/auth'
import { useOrderStore } from '@/stores/order'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: () => {
        const store = useAuthStore()
        const orders = useOrderStore()

        if (!store.isAuth) {
          router.push('/login')
        }

        orders.getOrders()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
      beforeEnter: () => {
        const store = useAuthStore()

        if (!store.isAuth) {
          router.push('/login')
        }
      }
    }
  ]
})

export default router
