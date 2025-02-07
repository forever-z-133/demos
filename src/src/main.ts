import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/app.less'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
