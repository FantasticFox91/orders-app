import { defineStore } from 'pinia'
import router from '../router/index'
import api from '../plugins/api'
import { useModalsStore } from './modals'
import { useLoaderStore } from './loader'

interface AuthData {
  userName: string
  password: string
}

interface AuthUser {
  name: string
  role: string,
}

interface AuthState {
  isAuth: boolean
  user: AuthUser
}

const defaultUser = {
  name: '',
  role: ''
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      isAuth: localStorage.getItem('isAuth') !== null ? JSON.parse(localStorage.getItem('isAuth')!) : false,
      user: localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')!) : defaultUser,
    }
  },
  actions: {
    async login(data: AuthData) {
      const useModals = useModalsStore()
      const useLoader = useLoaderStore()
      useLoader.toggleLoading()
      try {
        const user = await api.auth.login(data)
        if (typeof user !== 'string' && user.success) {
          this.isAuth = true
          this.user = user.data.user
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('user', JSON.stringify(user.data.user));
          return router.push('/')
        }
        if (typeof user === 'string') {
          useModals.isError = true
          useModals.errorMessage = user
        }
      } finally {
        useLoader.toggleLoading()
      }
    },
    logout() {
      localStorage.clear()
      this.isAuth = false
      this.user = defaultUser;
      router.push('/login')
    }
  }
})
