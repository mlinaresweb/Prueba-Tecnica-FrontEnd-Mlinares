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
    const visibleImages = computed(() => imageItems.value.slice(0, 6));

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

<template>
  <div class="image-container">
    <div 
      class="image-item"
      v-for="item in visibleImages"
      :key="item.id"
    >
      <div class="image-box">
        <img
          class="image"
          :class="{ 'border-blue-500': isSelected(item.id) }"
          :src="item.url"
          @click="selectImage(item.id, item.seller.id)"
        />
      </div>
      <p class="seller-points">{{ getPointsLabel(item.seller) }}</p>
    </div>
  </div>
</template>

<style scoped>
.image-box {
  position: relative;
  padding-top: 54.44%; /* Proporción de aspecto: (altura / anchura * 100%) */
  overflow: hidden;
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.image-box:hover {
  transform: scale(1.05);
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all .3s ease-in-out;
  border: 4px solid transparent;
  border-radius: 10px;
}

.border-blue-500 {
  border-color: blue;
}

.seller-points {
  margin-top: 8px;
  text-align: center;
  font-weight: 600;
  color: #4a4a4a;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-left: 2.5%;
  margin-right: 2.5%;
}

/* Estilo para tabletas */
@media (min-width: 640px) {
  .image-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Estilo para pantallas de escritorio */
@media (min-width: 1024px) {
  .image-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
