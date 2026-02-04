import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

// Setup Pinia for state management
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')