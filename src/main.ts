import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { initApp } from './services/initService';
import router from './router' 

initApp().then(() => {
  createApp(App).use(store). use(router).mount('#app');
});
