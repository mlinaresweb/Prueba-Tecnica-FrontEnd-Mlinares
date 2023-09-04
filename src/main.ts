import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { initApp } from './services/initService';
import router from './router' 
import './assets/index.css'

initApp().then(() => {
  createApp(App).use(store). use(router).mount('#app');
});
