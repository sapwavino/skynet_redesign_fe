import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Vue3Marquee from 'vue3-marquee'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueApexCharts from "vue3-apexcharts";



const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vue3Marquee)
app.component('VueDatePicker', VueDatePicker);
app.use(VueApexCharts)
app.mount('#app')
app.config.globalProperties.axios = axios
