import { defineStore } from 'pinia'

interface LoaderState {
  isLoading: boolean
}

export const useLoaderStore = defineStore('loader', {
  state: (): LoaderState => {
    return {
      isLoading: false
    }
  },
  actions: {
    toggleLoading() {
      this.isLoading = !this.isLoading
    }
  }
})
