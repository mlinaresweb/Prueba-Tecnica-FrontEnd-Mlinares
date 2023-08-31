// Store
import { createStore } from 'vuex';

interface Seller {
  id: string;
  name: string;
  status: string;
  points: number;
}

export default createStore({
  state: {
    sellers: [] as Seller[],
    winner: null as Seller | null // Nueva variable para el vendedor ganador
  },
  mutations: {
    setSellers(state, sellers: Seller[]) {
      state.sellers = sellers;
    },
    addPoints(state, sellerId: string) {
      const seller = state.sellers.find(s => s.id === sellerId);
      if (seller && !state.winner) { // Verificamos que no hay un ganador aún
        seller.points += 3;
        if (seller.points >= 20) {
          state.winner = seller; // Establecemos al ganador
        }
      }
    },
    resetGame(state) {
      state.sellers.forEach(seller => {
        seller.points = 0;
      });
      state.winner = null;
    },
  },
  actions: {
    // Aquí puedes añadir llamadas a la API para actualizar los puntos
  },
});
