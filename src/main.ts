import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { initApp } from './services/initService';


initApp().then(() => {
  createApp(App).use(store).mount('#app');
});
