import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primeicons/primeicons.css'
import 'vue-toastification/dist/index.css'
import router from './router/index.js'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'



const app = createApp(App)
app.use(router);
app.use(Toast, {
  position: 'top-right',
  timeout: 5000
})
app.mount('#app')
