<template>
  <div v-if="winner">
    <p>{{ winner.name }} ha ganado la carrera</p>
    <FacturaComponent :winner="winner" />
    <button @click="resetGame">Reiniciar juego</button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import FacturaComponent from './FacturaComponent.vue';

export default {
  components: {
    FacturaComponent
  },
  setup() {
    const store = useStore();
    const winner = computed(() => store.state.game.winner);

    const resetGame = () => {
      store.dispatch('resetGame');
    };

    return {
      winner,
      resetGame
    };
  },
};
</script>
