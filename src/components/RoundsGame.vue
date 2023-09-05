<template>
  <div class="rounds-container">
    <h2 class="rounds-title">Ronda Actual</h2>
    <p>Ronda: {{ round }}</p>
  </div>
</template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const round = computed(() => store.state.game.round);
  
    return {
      round,
    };
  }, components:
  {

  }
};
</script>
<style scoped>
/* Copia los estilos del componente de Ranking */
.rounds-container {
  max-width: 220px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: black;
}

.rounds-title {
  font-size: 18px;
  margin-bottom: 12px;
  text-align: center;
}
</style>