import { defineStore } from 'pinia'

interface ModalsState {
  isError: boolean
  errorMessage: string
}

export const useModalsStore = defineStore('modals', {
  state: (): ModalsState => {
    return {
      isError: false,
      errorMessage: ''
    }
  }
})
