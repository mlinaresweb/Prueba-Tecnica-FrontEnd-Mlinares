<template>
  <div class="base-container" :class="containerClass">
    <h2 class="history-title">Historial de Rondas</h2> 
    <div class="header">
    </div>
    <ul v-if="isContentVisible" class="history-list">
      <li v-for="record in roundHistory" :key="record.round" class="history-item">
        <div class="round-number">Ronda {{ record.round }}</div>
        <img :src="findSellerImage(record.winner.id)" alt="Vendedor" class="seller-image">
        <div class="seller-name">{{ record.winner.name }}</div>
        <div class="points">{{ record.points }} puntos</div>
      </li>
    </ul>
    <div class="toggle-container">
      <ToggleButton
        :isContentVisible="isContentVisible"
        :toggleContentVisibility="toggleContentVisibility"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Seller } from '../store/types/types';
import ToggleButton from './ToggleButton.vue';
import { useToggleVisibility } from '../composables/useToggleVisibility';

export default defineComponent({
  components: {
    ToggleButton,
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
  flex-grow: 1;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.history-title {
  text-align: center;
  margin-bottom: 5px;
  font-family: Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
}
.history-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}

.round-number {
  font-weight: bold;
  font-size: 1.2em;
  margin-right: 10px;
}

.seller-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.seller-name {
  flex-grow: 1;
  font-size: 1.1em;
}

.points {
  font-weight: bold;
  color: #007bff;
}
</style>