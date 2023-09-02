<!-- Vue component -->
<template>
    <div class="image-container">
      <div
        class="image-item"
        v-for="item in visibleImages"
        :key="item.id"
      >
        <img
          class="image"
          :class="{ selected: item.id === selectedImageId }"
          :src="item.url"
          @click="selectImage(item.id, item.seller.id)"
        />
        <p>{{ item.seller.name }}: {{ item.seller.points }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  
  export default {
    setup() {
      const store = useStore();
  
      // Computed properties
      const imageItems = computed(() => store.state.images.imageItems);
      const selectedImageId = computed(() => store.state.game.selectedImageId);
      const visibleImages = computed(() => imageItems.value.slice(0, 5));
  
      // Selects an image and the corresponding seller
      const selectImage = (imageId: string, sellerId: string) => {
        store.commit('setSelectedImageId', imageId);
        store.commit('setSelectedSeller', sellerId);
      };
  
      return {
        visibleImages,
        selectedImageId,
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
