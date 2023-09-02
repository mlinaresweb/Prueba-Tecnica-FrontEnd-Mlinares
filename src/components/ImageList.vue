<template>
  <div class="image-container">
    <div 
      class="image-item"
      v-for="item in visibleImages"
      :key="item.id"
    >
      <img
        class="image"
        :class="{ selected: isSelected(item.id) }"
        :src="item.url"
        @click="selectImage(item.id, item.seller.id)"
      />
      <p>{{ getPointsLabel(item.seller) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // Computed property to get image items from the state
    const imageItems = computed(() => store.state.images.imageItems);

    // Computed property to get the selected image ID from the state
    const selectedImageId = computed(() => store.state.game.selectedImageId);

    // Filter to display only the first 5 image items
    const visibleImages = computed(() => imageItems.value.slice(0, 5));

    // Function to check if an image is selected
    const isSelected = (id: string) => id === selectedImageId.value;

    // Function to get the points label for a seller
    const getPointsLabel = (seller: { name: string, points: number }) => `${seller.name}: ${seller.points}`;

    // Function to handle image and seller selection
    const selectImage = (imageId: string, sellerId: string) => {
      store.commit('setSelectedImageId', imageId);
      store.commit('setSelectedSeller', sellerId);
    };

    return {
      visibleImages,
      isSelected,
      getPointsLabel,
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
