import { MutationTree, ActionTree } from 'vuex';
import { RootState,Seller,Factura } from '../types/types'; 
import { createFactura, createItem, getFactura  } from '../../services/alegraService';

export interface SellersState {
    sellers: Seller[];
    facturas: Factura[];
    lastFacturaId: number | null;
}

const state: SellersState = {
    sellers: [],
    facturas: [],
    lastFacturaId: null,

};

const mutations: MutationTree<SellersState> = {
    setSellers(state, sellers: Seller[]) {
        state.sellers = sellers;
      },
      updateSellerImage(state, payload: { id: string, imageUrl: string }) {
        const seller = state.sellers.find(s => s.id === payload.id);
        if (seller) {
          seller.imageUrl = payload.imageUrl;
        }
      },
      ADD_FACTURA(state, factura: Factura) {
        state.facturas.push(factura);
      },
      SET_LAST_FACTURA_ID(state, id: number) {
        state.lastFacturaId = id;
      },
};

const actions: ActionTree<SellersState, RootState> = {
  async createFactura({ commit }, factura: Factura) {
    try {
      // Crear un ítem primero para obtener su ID
      const itemName = 'points';
      const itemPrice = factura.items[0].price;
      const itemId = await createItem(itemName, itemPrice);

      // Usa la ID del ítem al crear la factura
      factura.items[0].id = itemId;

      const facturaId = await createFactura(factura);
      commit('SET_LAST_FACTURA_ID', facturaId);
      commit('ADD_FACTURA', factura);

    } catch (error) {
      console.error("Error al crear factura o ítem:", error);
      throw new Error('Error al crear factura o ítem');
    }
  },
  async getFactura(_, id: string) {
   
    try {
      const facturaData = await getFactura(id);
      return facturaData;  // Devuelve los datos para que puedan ser usados en el componente
    } catch (error) {
      console.error("Error al obtener la factura:", error);
      throw new Error('Error al obtener la factura');
    }
  },
};

export default {
    
  state,
  mutations,
  actions,
};