<template>
  <div>
    <input :value="query" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import { computed, Ref } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { ImageItem, Seller } from '../store/types/types';

export default {
  setup() {
    const store = useStore();

    // Computed properties for query and winner state
    const query: Ref<string> = computed(() => store.state.images.query);
    const winner: Ref<boolean> = computed(() => store.state.game.winner);

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
        const images = await fetchImages(query.value, 10);
        const mappedImages = await filterAndMapImages(images);
        store.commit('setImageItems', mappedImages);
        store.commit('setExtraImages', mappedImages.slice(5));
      }
    };

    // Handle input event for the search query
    const handleInput = ($event: Event) => {
      const target = $event.target as HTMLInputElement | null;
      if (target) {
        setNewQuery(target.value);
        loadImages();
      }
    };

    return {
      query,
      handleInput,
    };
  },
};
</script>


<style scoped>

</style>
