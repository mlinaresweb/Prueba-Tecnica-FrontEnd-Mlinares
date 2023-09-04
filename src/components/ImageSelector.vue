<template>
  <div>
    <label>
      <input type="radio" value="google" v-model="selectedApi">
      Google
    </label>
    <label>
      <input type="radio" value="unsplash" v-model="selectedApi">
      Unsplash
    </label>
    <input :value="query" @input="updateQuery" @keyup.enter="handleInput" />
  </div>
</template>


<script lang="ts">
import { computed, Ref, ref } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { fetchUnsplashImages } from '../services/unplashService';
import { ImageItem, Seller } from '../store/types/types';

export default {
  setup() {
    const store = useStore();

    // Computed properties for query and winner state
    const query: Ref<string> = computed(() => store.state.images.query);
    const winner: Ref<boolean> = computed(() => store.state.game.winner);
    
    const selectedApi = ref('google');

    // Update query in Vuex state
    const setNewQuery = (newQuery: string) => {
      store.commit('setQuery', newQuery);
    };

    // Validate if an image URL is accessible
    const isValidImage = async (url: string): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    // Filter invalid images and assign sellers to images
    const filterAndMapImages = async (images: ImageItem[]): Promise<ImageItem[]> => {
      const sellers = store.state.sellers.sellers;
      const validImages = await Promise.all(
        images.map(async (image) => (await isValidImage(image.url)) ? image : null)
      );
      const filteredImages = validImages.filter(Boolean) as ImageItem[];

      return assignSellersToImages(filteredImages, sellers);
    };

    // Assign sellers to the images
    const assignSellersToImages = (images: ImageItem[], sellers: Seller[]) => {
      return images.map((image, index) => ({
        ...image,
        seller: sellers[index % sellers.length],
      }));
    };

    // Load new images based on the query
    const loadImages = async () => {
  if (winner.value) {
    alert("El juego ha terminado, no se pueden cargar más imágenes.");
    return;
  }
  if (query.value) {
    let images: ImageItem[] = [];  
    if (selectedApi.value === 'google') {
      images = await fetchImages(query.value, 10);
    } else if (selectedApi.value === 'unsplash') {
      images = await fetchUnsplashImages(query.value, 10);
    }

    // Verificamos si images tiene elementos antes de continuar
    if (images.length > 0) {
      const mappedImages = await filterAndMapImages(images);
      store.commit('setImageItems', mappedImages);
      store.commit('setExtraImages', mappedImages.slice(6));
    }
  }
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
      selectedApi
    };
  },
};
</script>


<style scoped>

</style>
