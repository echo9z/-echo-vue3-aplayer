import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 注册使用
import CountTo from './components/count-to'
createApp(App).use(CountTo).mount('#app')
