import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '../types/types'; 

export interface ImagesState {
    selectedImages: Record<string, boolean>;

}

const state: ImagesState = {
    selectedImages: {},


};

const mutations: MutationTree<ImagesState> = {
    selectImage(state, payload) {
        const { imageId, selected } = payload;
        if (selected) {
          state.selectedImages[imageId] = true;
        } else {
          delete state.selectedImages[imageId];
        }
      },
 
};

const actions: ActionTree<ImagesState, RootState> = {

};

export default {
    
  state,
  mutations,
  actions,
};