import { createApp } from "vue";
import * as echarts from 'echarts'
import ElementPlus from 'element-plus';

import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/lib/theme-chalk/index.css';

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon.scss";

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount("#app")
app.config.globalProperties.$echarts = echarts
