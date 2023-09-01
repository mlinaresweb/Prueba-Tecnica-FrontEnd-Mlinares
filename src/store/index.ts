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
    winner: null as Seller | null,
    round: 1,
    selectedImages: {} as Record<string, boolean>
  },
  mutations: {
    setSellers(state, sellers: Seller[]) {
      state.sellers = sellers;
    },
    addPoints(state, sellerId: string) {
      const seller = state.sellers.find(s => s.id === sellerId);
      if (seller && !state.winner) {
        seller.points += 3;
        if (seller.points >= 20) {
          state.winner = seller;
        }
      }
    },
    resetGame(state) {
      state.sellers.forEach(seller => {
        seller.points = 0;
      });
      state.winner = null;
    },
    incrementRound(state) {
      state.round++;
      state.selectedImages = {}; // Reiniciar las imágenes seleccionadas
    },
    selectImage(state, payload) {
      const { imageId, selected } = payload;
      if (selected) {
        state.selectedImages[imageId] = true;
      } else {
        delete state.selectedImages[imageId];
      }
    },
    
  },
  actions: {
    // Tus acciones
  }
});
