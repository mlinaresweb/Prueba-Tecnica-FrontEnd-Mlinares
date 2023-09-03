<template>
    <div>
      <h2>Historial de Rondas</h2>
      <ul>
        <li v-for="record in roundHistory" :key="record.round">
          Ronda {{ record.round }}: {{ record.winner.name }} ({{ record.points }} puntos)
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      const roundHistory = computed(() => store.state.game.roundHistory);
  
      return {
        roundHistory
      };
    }
  };
  </script>
  