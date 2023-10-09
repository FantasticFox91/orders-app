import './assets/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import apiPlugin from './plugins/api'

const app = createApp(App)
const store = createPinia()

store.use(apiPlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')
