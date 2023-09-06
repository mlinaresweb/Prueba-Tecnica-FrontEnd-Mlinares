<template>
  <div>
    <!-- Solo se muestra si hay imágenes -->
    <button v-if="hasImages" class="end-round-button" @click="endRound">
      <i class="fas fa-flag"></i> Finalizar ronda
    </button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const selectedSeller = computed(() => store.state.game.selectedSeller);
    const query = computed(() => store.state.images.query);  
    const hasImages = computed(() => store.state.images.imageItems.length > 0); // Nuevo

    const endRound = () => {
      if (!query.value) {
        alert("Debes ingresar una palabra para continuar.");
        return;
      }
      if (!selectedSeller.value) {
        alert("Debes seleccionar una imagen para continuar.");
        return;
      }
      store.dispatch('addPoints', selectedSeller.value);
      store.dispatch('deselectSellerAndImage'); 
      store.commit('incrementRound');
      store.commit('setQuery', '');
      store.commit('setImageItems', []);
    };

    return {
      endRound,
      hasImages // Nuevo
    };
  },
};
</script>
<style scoped>
.end-round-button {
  background-color: #3644fc;
  border: none;
  border-radius: 15px;
  color: white;
  padding: 5px 10px;
  font-size: 0.8em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.end-round-button:hover {
  background-color: #4072fc;
  transform: scale(1.05);
}

.end-round-button i {
  margin-right: 5px;
}
</style>