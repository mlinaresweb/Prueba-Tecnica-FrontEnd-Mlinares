import { MutationTree, ActionTree } from 'vuex';
import { RootState, ImageItem } from '../types/types'; 

export interface ImagesState {
    selectedImages: Record<string, boolean>;
    query: string;
    imageItems: ImageItem[];
    extraImages: ImageItem[];  
}

const state: ImagesState = {
    selectedImages: {},
    query: '',
    imageItems: [], 
    extraImages: [],
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
    setQuery(state, newQuery: string) {
        state.query = newQuery;
    },
    setImageItems(state, items: ImageItem[]) { 
        state.imageItems = items;
    },
    setExtraImages(state, items: ImageItem[]) { 
        state.extraImages = items;
      },
};

const actions: ActionTree<ImagesState, RootState> = {
};

export default {  
    state,
    mutations,
    actions,
};
