import { defineStore } from 'pinia'
import api from '../plugins/api'
import { useLoaderStore } from './loader'
import router from '@/router'

interface Order {
  id: number
  name: string
  address: string
  date: string | Date
  status: string
  comment: string
}

interface OrderState {
  orders: Order[]
}

interface OrderAddData {
  userName: string
  address: string
  comment: string
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => {
    return {
      orders: []
    }
  },
  actions: {
    async getOrders() {
      if (!this.orders.length) {
        const useLoader = useLoaderStore()
        useLoader.toggleLoading()
        try {
          const orders: Order[] = await api.orders.get()
          this.orders = orders
        } catch (err) {
          console.log(err)
        } finally {
          useLoader.toggleLoading()
        }
      }
    },
    async updateOrder(id: number) {
      const useLoader = useLoaderStore()
      useLoader.toggleLoading()
      try {
        const orders = await api.orders.update(id)
        this.orders = orders
      } catch (err) {
        console.log(err)
      } finally {
        useLoader.toggleLoading()
      }
    },
    async deleteOrder(id: string) {
      const useLoader = useLoaderStore()
      useLoader.toggleLoading()
      try {
        const orders = await api.orders.delete(id)
        this.orders = orders
      } catch (err) {
        console.log(err)
      } finally {
        useLoader.toggleLoading()
      }
    },
    async addOrder(data: OrderAddData) {
      const useLoader = useLoaderStore()
      useLoader.toggleLoading()
      try {
        const orders = await api.orders.add(data)
        this.orders = orders
        router.push('/')
      } catch (err) {
        console.log(err)
      } finally {
        useLoader.toggleLoading()
      }
    }
  }
})
