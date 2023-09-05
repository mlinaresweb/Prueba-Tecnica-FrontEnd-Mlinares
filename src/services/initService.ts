import { getSellers } from './alegraService';
import { AlegraSellerResponse } from "../store/types/types";
import store from '../store';

export async function initSellers() {
  try {
    const sellersData = await getSellers();
    if (sellersData && sellersData.length >= 6) {
      const imageUrls = [
        '/seller1.png',
        '/seller2.png',
        '/seller3.png',
        '/seller4.png',
        '/seller5.png',
        '/seller6.png',
      ];
      

      const sellers = sellersData.slice(0, 6).map((seller: AlegraSellerResponse, index: number) => {
        return {
          ...seller,
          points: 0,
          imageUrl: imageUrls[index], // Agregar la URL de la imagen correspondiente
        };
      });

      // Actualiza el estado con los nuevos vendedores
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
