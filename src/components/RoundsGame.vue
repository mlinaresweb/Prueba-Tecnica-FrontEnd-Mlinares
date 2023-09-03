<template>
    <div>
      <p>Ronda: {{ round }}</p>
      <button @click="endRound">Finalizar ronda</button>
    </div>
  </template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const round = computed(() => store.state.game.round);
    const selectedSeller = computed(() => store.state.game.selectedSeller);
    const query = computed(() => store.state.images.query);  

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
      round,
      endRound
    };
  },
};
</script>
