import { MutationTree, ActionTree } from 'vuex';
import { RootState, Client } from '../types/types';
import { createClient, getClient } from '../../services/alegraService';

export interface ClientState {
  client: Client | null;
}

const state: ClientState = {
  client: null,
};

const mutations: MutationTree<ClientState> = {
  SET_CLIENT(state, client: Client) {
    state.client = client;
    localStorage.setItem('client', JSON.stringify(client));
  },
};

const actions: ActionTree<ClientState, RootState> = {
  async createClient({ commit }, client: Client) {
    const clientId = await createClient(client);
    client.id = clientId;
    commit('SET_CLIENT', client);
  },
  
  async fetchClient({ commit }, id: number) {
    const client = await getClient(id);
    commit('SET_CLIENT', client);
  },

  initializeClient({ commit }) {
    const clientString = localStorage.getItem('client');
    if (clientString) {
      const client = JSON.parse(clientString);
      commit('SET_CLIENT', client);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
