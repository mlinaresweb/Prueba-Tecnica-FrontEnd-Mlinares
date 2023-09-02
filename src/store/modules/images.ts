import { MutationTree, ActionTree } from 'vuex';
import { RootState, ImageItem } from '../types/types'; 

interface SelectImagePayload {
  imageId: string;
  selected: boolean;
}

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
    // Toggles the selection state of an image by its ID
    selectImage(state, { imageId, selected }: SelectImagePayload) {
        if (selected) {
          state.selectedImages[imageId] = true;
        } else {
          delete state.selectedImages[imageId];
        }
    },
    // Sets the search query
    setQuery(state, newQuery: string) {
        state.query = newQuery;
    },
    // Sets the main list of image items
    setImageItems(state, items: ImageItem[]) {
        state.imageItems = items;
    },
    // Sets the list of extra image items
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
