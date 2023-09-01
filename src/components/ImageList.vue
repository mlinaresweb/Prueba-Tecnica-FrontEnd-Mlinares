<template>
    <div class="image-container">
      <div
        class="image-item"
        v-for="item in imageItems.slice(0, 5)"
        :key="item.id"
      >
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
  </template>
  
  <script lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { ImageItem } from "../store/types/types";

  export default {
    setup() {
      const store = useStore();
      const imageItems = computed(() => store.state.images.imageItems);
      const extraImages = computed(() => store.state.images.extraImages);
      const selectedImageId = computed(() => store.state.game.selectedImageId);
  
      const handleImageError = (id: string) => {
  const index = store.state.images.imageItems.findIndex((item: ImageItem) => item.id === id);  
  if (index !== -1 && extraImages.value.length > 0) {
    const [replacement] = extraImages.value.splice(0, 1);
    const newImageItems = [...store.state.images.imageItems];
    newImageItems.splice(index, 1, replacement);
    store.commit('setImageItems', newImageItems);  
  }
};
  
      const selectImage = (imageId: string, sellerId: string) => {
        store.commit('setSelectedImageId', imageId);
        store.commit('setSelectedSeller', sellerId);
      };
  
      return {
        imageItems,
        selectedImageId,
        handleImageError,
        selectImage,
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
