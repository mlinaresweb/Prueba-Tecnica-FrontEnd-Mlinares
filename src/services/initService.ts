import { getSellers } from './alegraService';
import { AlegraSellerResponse } from "../store/types/types";
import store from '../store';

export async function initSellers() {
  try {
    const response = await getSellers();
    if (response.data && response.data.length >= 5) {
      const sellers = response.data.slice(0, 5).map((seller: AlegraSellerResponse) => ({ ...seller, points: 0 }));
      store.commit('setSellers', sellers);
    } else {
      console.error('No hay suficientes vendedores');
    }
  } catch (error) {
    console.error('Error al obtener vendedores:', error);
  }
}

export async function initApp() {
  await initSellers();
}
