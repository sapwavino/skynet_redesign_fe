import './assets/main.css'

import {createApp, defineAsyncComponent} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Vue3Marquee from 'vue3-marquee'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vue3Marquee)
app.component('VueDatePicker', VueDatePicker);


// Lazy load VueApexCharts
app.component('apexchart', defineAsyncComponent(() => import('vue3-apexcharts')));

app.use(app.config.globalProperties.$apexcharts);


app.mount('#app')
axios.defaults.headers.common = {};
app.config.globalProperties.axios = axios
