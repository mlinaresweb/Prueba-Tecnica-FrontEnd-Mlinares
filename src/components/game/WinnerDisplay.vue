<template>
  <div v-if="winner" class="winner-container">
    <div class="winner-banner">
      <img :src="findSellerImage(winner.id)" alt="Ganador" class="winner-image"/>
      <h1><span class="highlight">{{ winner.name }}</span> ha ganado la carrera</h1>
    </div>
    <FacturaComponent :winner="winner" />
    <CustomButton :buttonText="'Reiniciar juego'" :onClick="resetGame" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import FacturaComponent from '../factura/FacturaComponent.vue';
import CustomButton from '../reusable/CustomButton.vue'; 
import { Seller } from '../../store/types/types';

export default {
  components: {
    FacturaComponent,
    CustomButton  
  },
  setup() {
    const store = useStore();
    const winner = computed(() => store.state.game.winner);
    const sellers = computed(() => store.state.sellers.sellers);

    const resetGame = () => {
      store.dispatch('resetGame');
      store.commit('setQuery', '');
    };

    const findSellerImage = (id: string) => {
      const seller = sellers.value.find((s: Seller) => s.id === id);
      return seller ? seller.imageUrl : '../../public/seller1.png';
    };

    return {
      winner,
      resetGame,
      findSellerImage
    };
  },
};
</script>

<style scoped>
.winner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fcfcfc;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  margin-left: 10px;
  margin-right: 10px;
}

.winner-banner {
  display: flex;
  align-items: center;
  text-align: center;
}

.winner-image {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  color: #333;
}

.highlight {
  color: #007bff;
}

.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

}

.reset-button:hover {
  background-color: #0056b3;
}
</style>
