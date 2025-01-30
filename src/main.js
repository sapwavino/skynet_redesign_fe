import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Vue3Marquee from 'vue3-marquee'


const app = createApp(App)
console.log('App.vue has been created!')
app.use(router)
app.use(store)
app.use(Vue3Marquee)
app.mount('#app')
app.config.globalProperties.axios = axios
