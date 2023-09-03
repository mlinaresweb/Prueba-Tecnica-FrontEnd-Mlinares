import { MutationTree, ActionTree } from 'vuex';
import { RootState, Seller } from '../types/types';

const WINNING_POINTS = 20;
const INITIAL_POINTS = 0;

export interface GameState {
    winner: Seller | null;
    round: number;
    selectedSeller: string | null;
    selectedImageId: string | null;
}

const state: GameState = {
    winner: null,
    round: 1,
    selectedSeller: null,
    selectedImageId: null
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
};

const actions: ActionTree<GameState, RootState> = {
    addPoints({ commit, state, rootState }, sellerId: string) {
        if (state.winner) return;

        const seller = rootState.sellers.sellers.find((s: Seller) => s.id === sellerId);
    
        if (seller) {
          commit('addPoints', seller); 
    
          if (seller.points >= WINNING_POINTS) {
            commit('setWinner', seller);
          }
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
