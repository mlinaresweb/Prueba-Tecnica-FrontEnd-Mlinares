import { MutationTree, ActionTree } from 'vuex';
import { RootState,Seller } from '../types/types'; 

export interface SellersState {
    sellers: Seller[];

}

const state: SellersState = {
    sellers: [],


};

const mutations: MutationTree<SellersState> = {
    setSellers(state, sellers: Seller[]) {
        state.sellers = sellers;
      },
 
};

const actions: ActionTree<SellersState, RootState> = {

};

export default {
    
  state,
  mutations,
  actions,
};