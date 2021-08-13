import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import store from './store/index'
import   './assets/styles/common/global.scss'
import { createPinia } from 'pinia'
import '@/assets/styles/theme/_handle.scss'

import TIM from 'tim-js-sdk'
import tim from './tim'

axios.defaults.baseURL = import.meta.env.VITE_APP_URL

const app = createApp(App)

// app.config.globalProperties.$tim = tim
app.config.globalProperties.$TIM = TIM
app.config.globalProperties.$tim = tim

app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(createPinia())
app.mount('#app')
