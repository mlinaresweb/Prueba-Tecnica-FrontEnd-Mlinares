import { MutationTree, ActionTree } from 'vuex';
import { RootState, Seller } from '../types/types';

const WINNING_POINTS = 20;
const INITIAL_POINTS = 0;

export interface GameState {
    winner: Seller | null;
    round: number;
    selectedSeller: string | null;
    selectedImageId: string | null;
    roundHistory: { round: number, winner: Seller, points: number }[];
}

const state: GameState = {
    winner: null,
    round: 1,
    selectedSeller: null,
    selectedImageId: null,
    roundHistory: [],
};

const mutations: MutationTree<GameState> = {
    // Adds points to a seller if there is no winner yet
    addPoints(state, seller: Seller) {
        if (seller && !state.winner) {
          seller.points += 3;
        }
    },
    setWinner(state, seller: Seller) {
        state.winner = seller;
    },
    resetGame(state) {
        state.winner = null;
        state.round = 1;
        state.roundHistory = [];  
    },
    incrementRound(state) {
        state.round++;
    },
    setSelectedSeller(state, sellerId: string | null) {
        state.selectedSeller = sellerId;
    },
    setSelectedImageId(state, imageId: string | null) {
        state.selectedImageId = imageId;
    },
    deselectSellerAndImage(state) {
        state.selectedSeller = null;
        state.selectedImageId = null;
      },
      addRoundHistory(state, payload: { winner: Seller, points: number }) {
        state.roundHistory.push({ round: state.round, winner: payload.winner, points: payload.points });  // <-- Agregar el ganador y los puntos de la ronda al historial
    },
};

const actions: ActionTree<GameState, RootState> = {
    addPoints({ commit, state, rootState }, sellerId: string) {
        if (state.winner) return;

        const seller = rootState.sellers.sellers.find((s: Seller) => s.id === sellerId);
    
        if (seller) {
          const pointsBefore = seller.points;
          commit('addPoints', seller); 
    
          if (seller.points >= WINNING_POINTS) {
            commit('setWinner', seller);
          }

          const pointsGained = seller.points - pointsBefore;
          commit('addRoundHistory', { winner: seller, points: pointsGained });  // <-- Agregar al historial
        }
    },
    resetGame({ commit, rootState }) {
        rootState.sellers.sellers.forEach((seller: Seller) => {
            seller.points = INITIAL_POINTS;
        });
        commit('resetGame');
    },
    incrementRound({ commit }) {
        commit('incrementRound');
    },
    deselectSellerAndImage({ commit }) {
        commit('deselectSellerAndImage');
      },
};

export default {
    state,
    mutations,
    actions,
};
