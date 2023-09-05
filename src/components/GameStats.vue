<!-- GameStats.vue -->
<template>
    <div class="game-stats-container">
      <!-- Componentes hijos -->
      <div v-if="selectedComponent === 'ranking'">
        <RankingSellers @changeComponent="onChangeComponent"></RankingSellers>
      </div>
      <div v-if="selectedComponent === 'history'">
        <RoundHistorial @changeComponent="onChangeComponent"></RoundHistorial>
      </div>
    </div>
      <!-- Otros componentes -->
      <RoundsGame></RoundsGame>
    
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import RankingSellers from './RankingSellers.vue';
  import RoundHistorial from './RoundHistorial.vue';
  import RoundsGame from './RoundsGame.vue';
  
  export default defineComponent({
    components: {
      RankingSellers,
      RoundHistorial,
      RoundsGame,
    },
    setup() {
      const selectedComponent = ref('ranking');
  
      const onChangeComponent = (newComponent: string) => {
        selectedComponent.value = newComponent;
      };
  
      return {
        selectedComponent,
        onChangeComponent,
      };
    },
  });
  </script>
  
  
  <style scoped>
.game-stats-container {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Omitir si no es necesario */
  text-align: center;
}


  </style>
  