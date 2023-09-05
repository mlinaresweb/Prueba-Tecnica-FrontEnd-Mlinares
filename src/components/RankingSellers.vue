<template>
  <div class="base-container ranking-container">
    <h2 class="ranking-title">Ranking de Vendedores</h2> 
    <div class="header"></div>
    <table v-if="isContentVisible" class="ranking-table">
      <thead>
        <tr>
          <th>#</th> <!-- Columna para el número -->
          <th></th> <!-- Columna para la imagen -->
          <th>Nombre</th>
          <th>Puntos</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(seller, index) in sellersSortedByPoints" :key="seller.id">
          <td>{{ index + 1 }}</td> <!-- Número del vendedor -->
          <td><img :src="seller.imageUrl" alt="Imagen del vendedor" class="seller-mini-image"></td> <!-- Imagen del vendedor -->
          <td>{{ seller.name }}</td>
          <td>{{ seller.points }} / 20</td>
          <td>
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${(seller.points / 20) * 100}%` }"></div>
    </div>
    <div class="progress-labels">
      <span class="progress-start">{{ (seller.points / 20) * 100 }}%</span> <!-- Porcentaje actual -->
      <span class="progress-end">100%</span> <!-- Porcentaje máximo -->
    </div>
  </div>
</td>
        </tr>
      </tbody>
    </table>
    <div class="toggle-container">
      <ToggleButton
        :isContentVisible="isContentVisible"
        :toggleContentVisibility="toggleContentVisibility"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useToggleVisibility } from '../composables/useToggleVisibility'; 
import ToggleButton from './ToggleButton.vue'; 

export default defineComponent({
  components: {
    ToggleButton,
  },
  setup(_, { emit }) {
    const store = useStore();
    const { sellers } = store.state.sellers;
    const { isContentVisible, toggleContentVisibility } = useToggleVisibility('RankingSellers');
    const sellersSortedByPoints = computed(() => {
      return [...sellers].sort((a, b) => b.points - a.points);
    });

    const onChange = (value: string) => {
      emit('changeComponent', value);
    };

    return {
      sellersSortedByPoints,
      onChange,
      isContentVisible,
      toggleContentVisibility,
    };
  },
});
</script>
<style scoped>
.ranking-container {
  width: 60%;
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.ranking-title {
  text-align: center;
  margin-bottom: 5px;
  font-family: Arial, sans-serif;
  font-size: 1.5em;
  font-weight: bold;
}
.ranking-table th, .ranking-table td {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

/* Especificar el ancho de las columnas */
.ranking-table th:nth-child(1), .ranking-table td:nth-child(1) {
  width: 10%; /* O la medida que desees */
}

.ranking-table th:nth-child(2), .ranking-table td:nth-child(2) {
  width: 10%; /* O la medida que desees */
}

.ranking-table th:nth-child(3), .ranking-table td:nth-child(3) {
  width: 15%; /* O la medida que desees */
}
.ranking-table th:nth-child(4), .ranking-table td:nth-child(4) {
  width: 20%; /* O la medida que desees */
}
.progress-container {
  width: 100%;
}

.progress-bar {
  height: 12px; /* altura más grande */
  background: #eee;
  border-radius: 6px;
}
.progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .progress-start {
    margin-left: 2px; /* ajusta como prefieras */
  }

  .progress-end {
    margin-right: 2px; /* ajusta como prefieras */
  }
  .seller-mini-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,  rgb(83, 172, 255)0%, rgb(49, 78, 241) 100%);
  border-radius: 6px;
  transition: width 0.5s ease-in-out;
}
</style>