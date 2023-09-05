<template>
  <div>
    <!-- Solo se muestra si hay imágenes -->
    <button v-if="hasImages" @click="endRound">Finalizar ronda</button>
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
