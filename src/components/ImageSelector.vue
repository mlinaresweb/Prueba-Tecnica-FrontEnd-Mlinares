<template> 
    <div class="relative w-full">
      <input :value="query" @input="updateQuery" @keyup.enter="handleInput" autocomplete="off" type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search...">
      <button type="submit" @click="handleInput" class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 dark:bg-blue-600 dark:hover:bg-blue-700">
    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    </svg>
    <span class="sr-only">Search</span>
</button>

        </div>
</template>


<script lang="ts">
import { computed, Ref, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { fetchUnsplashImages } from '../services/unplashService';
import { ImageItem } from '../store/types/types';
import useImageFilterAndMapping from '../composables/useImageFilterAndMapping';

export default defineComponent({
  props: {
    selectedApi: String 
  },
  setup(props) {
    const store = useStore();
    const { filterAndMapImages } = useImageFilterAndMapping();
    // Computed properties for query and winner state
    const query: Ref<string> = computed(() => store.state.images.query);
    const winner: Ref<boolean> = computed(() => store.state.game.winner);
    
    // Load new images based on the query
    const loadImages = async () => {
  if (winner.value) {
    alert("El juego ha terminado, no se pueden cargar más imágenes.");
    return;
  }
  if (query.value) {
    let images: ImageItem[] = [];  
    if (props.selectedApi === 'google') {
      images = await fetchImages(query.value, 10);
    } else if (props.selectedApi === 'unsplash') {
      images = await fetchUnsplashImages(query.value, 10);
    }
    if (images.length > 0) {
      const mappedImages = await filterAndMapImages(images);
      store.commit('setImageItems', mappedImages);
      store.commit('setExtraImages', mappedImages.slice(6));
    }
  }
};

// Update query in Vuex state
const setNewQuery = (newQuery: string) => {
      store.commit('setQuery', newQuery);
    };

    // Handle input event for the search query
    const handleInput = async ($event: Event) => {
  const target = $event.target as HTMLInputElement | null;
  if (target) {
    await loadImages();  
  }
};

const updateQuery = ($event: Event) => {
  const target = $event.target as HTMLInputElement | null;
  if (target) {
    setNewQuery(target.value);
  }
};

    return {
      query,
      handleInput,
      updateQuery,
    };
  },
});
</script>


<style scoped>

</style>
