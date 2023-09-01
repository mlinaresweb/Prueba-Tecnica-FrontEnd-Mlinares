<template>
  <div>
    <input :value="query" @input="updateQueryAndLoadImages" />
    <div class="image-container">
      <div class="image-item" v-for="item in imageItems.slice(0, 5)" :key="item.id">
  <img
    class="image"
    :class="{ selected: item.id === selectedImageId }"  
    :src="item.url"
    @error="handleImageError(item.id)"
    @click="selectImage(item.id, item.seller.id)"
  />
        <p>{{ item.seller.name }}: {{ item.seller.points }}</p>
      </div>
    </div>
    <div>
      <p>Ronda: {{ round }}</p>
      <button @click="endRound">Finalizar ronda</button>
    </div>
  </div>
</template>



<script lang="ts">
import {  computed } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { ImageItem } from "../store/types/types";


export default {
    setup() {
        const store = useStore();
        const query = computed(() => store.state.images.query);
        const imageItems = computed(() => store.state.images.imageItems);
        const extraImages = computed(() => store.state.images.extraImages);
        const round = computed(() => store.state.game.round);
        const selectedImages = computed(() => store.state.images.selectedImages);
        const selectedSeller = computed(() => store.state.game.selectedSeller);
        const selectedImageId = computed(() => store.state.game.selectedImageId);
          const winner = computed(() => store.state.game.winner); 

        const isValidImage = async (url: string) => {
            return new Promise<boolean>((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };

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
const updateQueryAndLoadImages = ($event: Event) => {
  const target = $event.target as HTMLInputElement | null; // Hacemos un "type assertion" aquí
  if (target !== null) {
    setNewQuery(target.value);
    loadImages();
  }
};
const handleImageError = (id: string) => {
  const index = store.state.images.imageItems.findIndex((item: ImageItem) => item.id === id);  
  if (index !== -1 && extraImages.value.length > 0) {
    const [replacement] = extraImages.value.splice(0, 1);
    const newImageItems = [...store.state.images.imageItems];
    newImageItems.splice(index, 1, replacement);
    store.commit('setImageItems', newImageItems);  
  }
};

       
        const addPoints = (sellerId: string) => {
          store.commit('setSelectedSeller', sellerId);
            store.commit('addPoints', sellerId);
        };
   
        
        const selectImage = (imageId: string, sellerId: string) => {
          store.commit('setSelectedImageId', imageId);
            store.commit('setSelectedSeller', sellerId);
        };
        
        const endRound = () => {
            if (selectedSeller.value) {
                store.dispatch('addPoints', selectedSeller.value);
            }
            store.commit('incrementRound');
            store.commit('setQuery', '');
            store.commit('setImageItems', []);
        }
        return {
            query,
            imageItems,
            loadImages,
            addPoints,
            handleImageError,
            round,
            endRound,
            selectedImages,
            selectImage,
            selectedSeller,
            selectedImageId,
            winner,
            setNewQuery,
            updateQueryAndLoadImages
        };
    },
};
</script>
<style scoped>
.image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.image-item {
  flex: 1;
  text-align: center;
}

.image {
  width: 100px; 
  height: 100px;
  object-fit: cover;
}
.selected {
  border: 2px solid blue;
}
</style>
