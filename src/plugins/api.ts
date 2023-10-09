import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/'

const instance = axios.create({
  baseURL: BASE_URL
})

interface Order {
  id: number
  name: string
  address: string
  date: string | Date
  status: string
  comment: string
}

interface OrderResponse {
  data: {
    success: boolean
    data: Order[]
  }
}

interface OrderAddData {
  userName: string
  address: string
  comment: string
}

interface AuthData {
  userName: string
  password: string
}

interface AuthResponse {
  data: {
    success: boolean
    data: {
      user: {
        name: string
        role: 'ADMIN' | 'USER'
      }
    }
  }
}

interface AuthErrorResponse {
  response: {
    data: {
      data: string
    }
  }
}

export default {
  orders: {
    async get() {
      try {
        const res: OrderResponse = await instance.get(`/orders`)
        return res.data.data
      } catch (error) {
        console.error('An error occurred:', error)
        throw error
      }
    },
    async update(id: number) {
      try {
        const res: OrderResponse = await instance.patch(`/orders`, {id: id})
        return res.data.data
      } catch (error) {
        console.error('An error occurred:', error)
        throw error
      }
    },
    async delete(id: string) {
      try {
        const res: OrderResponse = await instance.delete(`/orders/${id}`)
        return res.data.data
      } catch (error) {
        console.error('An error occurred:', error)
        throw error
      }
    },
    async add(data: OrderAddData) {
      try {
        const res: OrderResponse = await instance.post(`/orders`, data)
        return res.data.data
      } catch (error) {
        console.error('An error occurred:', error)
        throw error
      }
    }
  },
  auth: {
    async login(data: AuthData) {
      try {
        const res: AuthResponse = await instance.post(`/users`, data)
        return res.data
      } catch (error) {
        const err = error as AuthErrorResponse
        return err.response.data.data
      }
    }
  }
}
