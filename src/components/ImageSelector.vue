<template>
  <div>
    <input :value="query" @input="handleInput" />
  </div>
</template>

<script lang="ts">
import { computed, Ref } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { ImageItem } from "../store/types/types";

export default {
  setup() {
    const store = useStore();

    const query: Ref<string> = computed(() => store.state.images.query);
    const winner: Ref<boolean> = computed(() => store.state.game.winner);

    const setNewQuery = (newQuery: string) => {
      store.commit('setQuery', newQuery);
    };

    const isValidImage = async (url: string): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const filterAndMapImages = async (images: ImageItem[]): Promise<ImageItem[]> => {
      const sellers = store.state.sellers.sellers;
      const validImages = await Promise.all(
        images.map(async (image) => (await isValidImage(image.url)) ? image : null)
      );

      const filteredImages = validImages.filter(Boolean) as ImageItem[];

      return filteredImages.map((image, index) => ({
        ...image,
        seller: sellers[index % sellers.length],
      }));
    };

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
