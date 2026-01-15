import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './assets/css/reset.css'
// import 'katex/dist/katex.min.css'

createApp(App).use(router).mount('#app')
