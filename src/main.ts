import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Global Error Handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global error:", err);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);
};

app.mount('#app')