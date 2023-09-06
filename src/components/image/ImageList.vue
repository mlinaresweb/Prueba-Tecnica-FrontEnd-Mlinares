
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

    const imageItems = computed(() => store.state.images.imageItems);

    const selectedImageId = computed(() => store.state.game.selectedImageId);

    const visibleImages = computed(() => imageItems.value.slice(0, 6));

    const isSelected = (id: string) => id === selectedImageId.value;

    const getPointsLabel = (seller: { name: string, points: number }) => `${seller.name}: ${seller.points}`;

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
  transform: scale(1.02);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);

}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all .3s ease-in-out;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1) ;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);


}

.border-blue-500 {
  transition: all .1s ease-in-out;

  border: 4px solid rgb(79, 134, 255);

}

.seller-info {
  background-color: #f9f9f9; 
  color: #333; 
  padding: 10px;
  text-align: center;
  border-radius: 0 0 10px 10px;
  font-weight: 600;
  font-size: 1em;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1); 

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

@media (min-width: 640px) {
  .image-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .image-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
