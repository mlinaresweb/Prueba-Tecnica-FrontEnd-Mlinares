
<template>
   <div class="">
    <ImageSkeletonLoader v-if="isLoading" />
    <div v-else class="image-container">
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
      <div class="seller-info">
        <div class="seller-details">
          <div class="seller-name">
            {{ item.seller.name }}
          </div>
          <button class="like-button">
            <RoundButton />
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { computed,defineComponent} from 'vue';
import { useStore } from 'vuex';
import RoundButton from '../game/RoundsButton.vue'; 
import ImageSkeletonLoader from '../loaders/ImageSkeletonLoader.vue';

export default defineComponent({
  components: {
    RoundButton,
    ImageSkeletonLoader,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.images.isLoading);

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
      isLoading
    };
  },
});
</script>


<style scoped>
.image-box {
  position: relative;
  padding-top: 70%;
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

.seller-info {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 0 0 10px 10px;
  font-weight: 700;
  font-size: 1em;
  position: relative;
}

.seller-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seller-name {
  font-size: 1.2em;
}

.points-number {
  margin-right: 5px;
  font-size: 1.5em;
}

.points-icon {
  color: gold;
  font-size: 1.2em;
}

.seller-name {
  margin-top: 5px;
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
