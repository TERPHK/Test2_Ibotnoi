import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router) // ใช้ Vue Router
  .mount('#app');
