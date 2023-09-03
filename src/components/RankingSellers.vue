<template>
  <div class="ranking-container">
    <h2 class="ranking-title">Ranking de Vendedores</h2>
    <div class="points-header">
      <span>Puntos Obtenidos</span>
      <span>Puntos Totales</span>
    </div>
    <ul class="ranking-list">
      <li class="ranking-item" v-for="seller in sellersSortedByPoints" :key="seller.id">
        <span class="seller-name">{{ seller.name }}</span>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${(seller.points / 20) * 100}%` }"></div>
          </div>
          <div class="points-footer">
            <span class="seller-points">{{ seller.points }}</span>
            <span class="total-points">20</span>
          </div>
        </div>
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
  
  <style scoped>
  .ranking-container {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  .ranking-title {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }
  
  .points-header,
  .points-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  
  .ranking-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .ranking-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .seller-name {
    font-weight: 600;
    margin-right: 5px;
  }
  
  .progress-container {
    width: 100%;
  }
  
  .progress-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    margin-top: 8px;
  }
  
  .progress-fill {
    height: 100%;
    background: #4caf50;
    border-radius: 4px;
  }
  
  .seller-points,
  .total-points {
    font-size: 14px;
    color: #777;
  }
  

</style>