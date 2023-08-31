import { createStore } from 'vuex';

interface Seller {
  id: string;
  name: string;
  status: string;
  points: number;
}

export default createStore({
  state: {
    sellers: [] as Seller[]
  },
  mutations: {
    setSellers(state, sellers: Seller[]) {
      state.sellers = sellers;
    },
    addPoints(state, sellerId: string) {
      const seller = state.sellers.find(s => s.id === sellerId);
      if (seller) {
        seller.points += 3;
      }
    }
  },
  actions: {
    // Aquí puedes añadir llamadas a la API para actualizar los puntos
  },
});
