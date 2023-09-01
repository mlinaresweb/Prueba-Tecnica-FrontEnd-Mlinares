import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import {  getSellers } from './services/alegraService';
import { AlegraSellerResponse } from "./store/types/types";


async function initSellers() {
    try {
      const response = await getSellers();
      if (response.data && response.data.length >= 5) {
        const sellers = response.data.slice(0, 5).map((seller:AlegraSellerResponse )=> ({ ...seller, points: 0 }));
        store.commit('setSellers', sellers);
      } else {
        // Puedes manejar el caso cuando hay menos de 5 vendedores si es necesario.
        console.error('No hay suficientes vendedores');
      }
    } catch (error) {
      console.error('Error al obtener vendedores:', error);
    }
  }
  
  initSellers().then(() => {
    createApp(App).use(store).mount('#app');
  });
  