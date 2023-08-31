<template>
  <div>
    <input v-model="query" @input="loadImages" />
    <div v-for="item in imageItems.slice(0, 5)" :key="item.id">
      <img :src="item.url" @error="handleImageError(item.id)" @click="addPoints(item.seller.id)" />
      <p>{{ item.seller.name }}: {{ item.seller.points }}</p>
    </div>
    <div v-if="winner">
      <p>{{ winner.name }} ha ganado la carrera</p>
      <button @click="resetGame">Reiniciar juego</button> 
    </div>
  </div>
</template>


<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';

interface ImageItem {
  id: string;
  url: string;
  seller: {
    id: string;
    name: string;
    points: number;
  };
}

export default {
  setup() {
    const store = useStore();
    const query = ref('');
    const imageItems = ref<ImageItem[]>([]);
    const extraImages = ref<ImageItem[]>([]);
      const winner = computed(() => store.state.winner); // Acceder al vendedor ganador desde el estado

    const isValidImage = async (url: string) => {
      return new Promise<boolean>((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const loadImages = async () => {
      if (query.value) {
        let images = await fetchImages(query.value, 10);
        const sellers: any = store.state.sellers;
        
        images = await Promise.all(images.map(async (image: ImageItem) => {
  if (await isValidImage(image.url)) {
    return image;
  }
  return null;
}));

images = images.filter((image: ImageItem | null) => image !== null);

imageItems.value = images.map((image: ImageItem, index: number) => {
  return {
    id: image.id,
    url: image.url,
    seller: sellers[index % sellers.length]
  };
});


        extraImages.value = imageItems.value.slice(5);
      }
    };

    const handleImageError = (id: string) => {
      const index = imageItems.value.findIndex(item => item.id === id);
      if (index !== -1 && extraImages.value.length > 0) {
        const [replacement] = extraImages.value.splice(0, 1);
        imageItems.value.splice(index, 1, replacement);
      }
    };

    const addPoints = (sellerId: string) => {
      store.commit('addPoints', sellerId);
    };
    const resetGame = () => {
  store.commit('resetGame');
};
    return {
      query,
      imageItems,
      loadImages,
      addPoints,
      handleImageError,
      winner,
      resetGame
    };
  }
};
</script>
