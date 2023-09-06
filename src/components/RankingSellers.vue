<template>
  <div class="base-container ranking-container flex flex-col space-y-4">
    <div class="text-center">
      <h2 class="ranking-title text-2xl font-bold">Ranking de Vendedores</h2>
    </div>
    <div class="header"></div>
    <table v-if="isContentVisible" class="ranking-table min-w-full bg-white rounded-md">
      <thead>
        <tr class="text-sm font-semibold text-left text-gray-700">
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2"></th>
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Puntos</th>
          <th class="px-4 py-2">Progreso</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(seller, index) in sellersSortedByPoints" :key="seller.id" class="border-t">
          <td class="px-4 py-2 text-index">{{ index + 1 }}</td>
          <td class="px-4 py-2">
            <img :src="seller.imageUrl" alt="Imagen del vendedor" class="seller-mini-image w-10 h-10 rounded-full">
          </td>
          <td class="px-4 py-2 text-name" >{{ seller.name }}</td>
          <td class="px-4 py-2 text-points">{{ seller.points }} / 20</td>
          <td class="px-4 py-2">
            <div class="progress-container relative pt-1">
              <div class="progress-bar flex h-2 bg-gray-200 rounded">
                <div class="progress-fill" :style="{ width: `${(seller.points / 20) * 100}%` }"></div>
              </div>
              <div class="progress-labels flex justify-between text-xs mt-1">
                <span class="progress-start">{{ (seller.points / 20) * 100 }}%</span>
                <span class="progress-end">100%</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useToggleVisibility } from '../composables/useToggleVisibility'; 

export default defineComponent({
  components: {
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
  width: 70%;
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

.progress-container {
  width: 100%;
}

.progress-bar {
  height: 12px;
  background: #eee;
  border-radius: 6px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.progress-start {
  margin-left: 2px;
}

.progress-end {
  margin-right: 2px;
}

.seller-mini-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgb(83, 172, 255) 0%, rgb(49, 78, 241) 100%);
  border-radius: 6px;
  transition: width 0.5s ease-in-out;
}
@media (max-width: 768px) {
  .seller-mini-image {
  width: 35px;
  height: 35px;
  }
  .ranking-container {
    width: 90%;
  }
}
  

@media (max-width: 500px) {
  .ranking-table th, .ranking-table td {
    padding: 4px;
  }
  .ranking-title {
    font-size: 1.2em;
  }
  .text-sm {
    font-size: 0.7em;
  }
  .text-points{
  font-size:0.7em ;
}
.progress-bar {
    height: 8px;
  }
  .progress-labels {
    font-size: 8px;
  }
}
@media (max-width: 400px) {
  .ranking-table th, .ranking-table td {
    padding: 2px;
  }
  .ranking-title {
    font-size: 1em;
  }
  .text-sm {
    font-size: 0.5em;
  }
  
  .seller-mini-image {
  width: 20px;
  height: 20px;
  }
  .progress-bar {
    height: 6px;
  }
  .progress-labels {
    font-size: 6px;
  }
}
@media (max-width: 300px) {
  .ranking-table th, .ranking-table td {
    padding: 1px;
  }
  .text-points{
  font-size:0.6em ;
}

  .seller-mini-image {
  width: 15px;
  height: 15px;
  }
  .text-name{
    font-size:0.6em ;

  }
  .text-index{
    font-size:0.6em ;
  }
}
</style>