<template>
  <div class="base-container ranking-container">
    <div class="header">
      <DropdownMenu
        :title="'Ranking de Vendedores'"
        :options="[
          { label: 'Ranking de Vendedores', value: 'ranking' },
          { label: 'Historial de Rondas', value: 'history' },
        ]"
        @change="onChange"
      ></DropdownMenu>
    </div>
    <table v-if="isContentVisible" class="ranking-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Puntos</th>
          <th>Progreso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="seller in sellersSortedByPoints" :key="seller.id">
          <td>{{ seller.name }}</td>
          <td>{{ seller.points }} / 20</td>
          <td>
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${(seller.points / 20) * 100}%` }"></div>
      </div>
      <div class="progress-labels">
        <span class="progress-start">0%</span>
        <span class="progress-end">{{ (seller.points / 20) * 100 }}%</span>
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
import DropdownMenu from './DropdownMenu.vue';
import ToggleButton from './ToggleButton.vue'; 

export default defineComponent({
  components: {
    DropdownMenu,
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
  width: 70%; /* O la medida que desees */
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
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(52,152,219,1) 0%, rgba(155,89,182,1) 100%);
  border-radius: 6px;
  transition: width 0.5s ease-in-out;
}
</style>