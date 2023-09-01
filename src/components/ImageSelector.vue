<!-- ImageSearch.vue -->
<template>
  <div>
    <input :value="query" @input="updateQueryAndLoadImages" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { ImageItem } from "../store/types/types";

export default {
  setup() {
    const store = useStore();
    const query = computed(() => store.state.images.query);
    const winner = computed(() => store.state.game.winner);

    const setNewQuery = (newQuery: string) => {
      store.commit('setQuery', newQuery);
    };

    const loadImages = async () => {
  if (winner.value) {
    alert("El juego ha terminado, no se pueden cargar más imágenes.");
    return;
  }
  if (query.value) {
    let images = await fetchImages(query.value, 10);
    const sellers: any = store.state.sellers.sellers;
    images = await Promise.all(images.map(async (image: ImageItem) => {
      if (await isValidImage(image.url)) {
        return image;
      }
      return null;
    }));
    images = images.filter((image: ImageItem | null) => image !== null);
    
    const mappedImages = images.map((image: ImageItem, index: number) => {
      return {
        id: image.id,
        url: image.url,
        seller: sellers[index % sellers.length]
      };
    });
    store.commit('setImageItems', mappedImages);  

    const extraImgs = store.state.images.imageItems.slice(5);
      store.commit('setExtraImages', extraImgs);  
  }
};
const isValidImage = async (url: string) => {
            return new Promise<boolean>((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

    const updateQueryAndLoadImages = ($event: Event) => {
      const target = $event.target as HTMLInputElement | null;
      if (target !== null) {
        setNewQuery(target.value);
        loadImages();
      }
    };

    return {
      query,
      updateQueryAndLoadImages,
    };
  },
};
</script>

<style scoped>

</style>
