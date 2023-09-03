<template>
    <div>
      <h2>Ranking de Vendedores</h2>
      <ul>
        <li v-for="seller in sellersSortedByPoints" :key="seller.id">
          {{ seller.name }}: {{ seller.points }}
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
      const { sellers } = store.state.sellers;

      const sellersSortedByPoints = computed(() => {
      return [...sellers].sort((a, b) => b.points - a.points);
    });
    
      return {
        sellersSortedByPoints
      };
    },
  };
  </script>
  