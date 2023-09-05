<template>
  <div class="ranking-container">
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
    <ul v-if="isContentVisible" class="ranking-list">
      <li class="ranking-item" v-for="seller in sellersSortedByPoints" :key="seller.id">
        <div class="seller-info">
          <span class="seller-name">{{ seller.name }}</span>
          <span class="seller-points">{{ seller.points }} / 20</span>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${(seller.points / 20) * 100}%` }"></div>
          </div>
        </div>
      </li>
    </ul>
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
import { useToggleVisibility } from '../composables/useToggleVisibility'; // importa la función composable
import DropdownMenu from './DropdownMenu.vue';
import ToggleButton from './ToggleButton.vue'; // importa el componente ToggleButton

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
    display: flex;
  flex-direction: column;
    max-width: 220px; 
    margin: 20px auto;
    padding: 15px;
    border-radius: 8px;
    background-color: #f5f5f5; 
    color: black;
  }
  
  .ranking-title {
    font-size: 18px; 
    margin-bottom: 12px;
    text-align: center;
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
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  
  .seller-info {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }
  
  .seller-name {
    font-size: 14px;
    font-weight: 600;
  }
  
  .seller-points {
    font-size: 12px;
    color: #777;
  }
  
  .progress-container {
    width: 45%;
  }
  
  .progress-bar {
    height: 6px;
    background: #eee;
    border-radius: 3px;
  }
  
  .progress-fill {
    height: 100%;
    background: #3498db; 
    border-radius: 3px;
  }

  </style>