<template>
 <div class="base-container history-container flex flex-col items-center space-y-4"
       :style="{ height: containerHeight + 'px' }">
    <h2 class="history-title text-2xl font-bold">Historial de Rondas</h2>
    <div class="header"></div>
    <ul v-if="isContentVisible" class="history-list w-full bg-white rounded-md p-4">
      <li v-for="record in roundHistory" :key="record.round" class="history-item flex items-center space-x-4 p-2">
        <div class="round-number text-lg font-semibold">{{ "Ronda " + record.round }}</div>
        <img :src="findSellerImage(record.winner.id)" alt="Vendedor" class="seller-image w-12 h-12 rounded-full">
        <div class="seller-name flex-grow text-lg">{{ record.winner.name }}</div>
        <div class="points text-lg text-blue-500 font-semibold">{{ record.points + " puntos" }}</div>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Seller } from '../../store/types/types';
import { useToggleVisibility } from '../../composables/useToggleVisibility';

export default defineComponent({
  props: {
    containerHeight: {
      type: Number,
      required: true,
    }
  },
  components: {
  },
  
  setup(_, { emit }) {
    const { isContentVisible, toggleContentVisibility } = useToggleVisibility('RoundHistorial');
    const store = useStore();
    const roundHistory = computed(() => store.state.game.roundHistory);
    const sellers = computed(() => store.state.sellers.sellers);

    const onChange = (value: string) => {
      emit('changeComponent', value);
    };
    const findSellerImage = (id: string) => {
  const seller = sellers.value.find((s: Seller) => s.id === id);
  return seller ? seller.imageUrl : '../../public/seller1.png';
}
    return {
      roundHistory,
      onChange,
      isContentVisible,
      toggleContentVisibility,
      findSellerImage,
      containerClass: computed(() => {
        return isContentVisible.value ? 'history-container' : 'history-container minimized';
      }),
    };
  }
});
</script>

<style scoped>
.history-container {
  width: calc(100% - 70% - 20px);
  flex-grow: 1;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; 
  max-height: calc(100% - 5px); 
}

.history-title {
  text-align: center;
  margin-bottom: 5px;
  font-family: Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 5px;
}

.history-item {
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1); 

}

.round-number {
  margin-right: 10px;
}

.seller-image {
  margin-right: 10px;
}

.seller-name {
  font-size: 1.1em;
}

.points {
  font-weight: bold;
}

@media (max-width: 768px) {
  .history-container {
    width: 90%;
  }
  .history-title {
    font-size: 1.3em;
  }

  .round-number, .points, .seller-name {
    font-size: 1em;
  }
  .seller-image {
    width: 35px;
    height: 35px;
  }
}

@media (max-width: 500px) {
  .history-title {
    font-size: 1.2em;
  }
  .round-number, .points, .seller-name {
    font-size: 0.9em;
  }
  .seller-image {
    width: 30px;
    height: 30px;
  }
}
@media (max-width: 320px) {
  .history-title {
    font-size: 1em;
  }
  .round-number, .points, .seller-name {
    font-size: 0.6em;
  }
  .seller-image {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: 768px) and (max-width: 1200px) {
  .history-container {
    width: 40%; 
  }
  .history-title {
    font-size: 1.4em; 
  }
  .round-number, .points, .seller-name {
    font-size: 0.7em; 
  }
  .seller-image {
    width: 40px; 
    height: 40px; 
  }
}


</style>