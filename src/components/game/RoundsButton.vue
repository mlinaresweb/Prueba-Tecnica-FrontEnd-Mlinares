<template>
  <div>
    <button v-if="hasImages" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" @click="endRound">
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
      hasImages 
    };
  },
};
</script>
<style scoped>

</style>