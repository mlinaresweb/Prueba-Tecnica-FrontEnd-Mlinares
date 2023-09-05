<template>
  <div class="base-container" :class="containerClass">
    <div class="header">
      
      <DropdownMenu
        :title="'Historial de Rondas'"
        :options="[
          { label: 'Ranking de Vendedores', value: 'ranking' },
          { label: 'Historial de Rondas', value: 'history' },
        ]"
        @change="onChange"
      ></DropdownMenu>
    </div>
    <ul v-if="isContentVisible" class="history-list">
      <li v-for="record in roundHistory" :key="record.round">
        <!-- Añade la imagen aquí -->
        <img :src="findSellerImage(record.winner.id)" alt="Vendedor" class="seller-image">
        Ronda {{ record.round }}: {{ record.winner.name }} ({{ record.points }} puntos)
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
import { Seller } from '../store/types/types';
import DropdownMenu from './DropdownMenu.vue';
import ToggleButton from './ToggleButton.vue';
import { useToggleVisibility } from '../composables/useToggleVisibility';

export default defineComponent({
  components: {
    DropdownMenu,
    ToggleButton,
  },
  setup(_, { emit }) {
    const { isContentVisible, toggleContentVisibility } = useToggleVisibility('RoundHistorial');
    const store = useStore();
    const roundHistory = computed(() => store.state.game.roundHistory);
    const sellers = computed(() => store.state.sellers.sellers);

    const onChange = (value: string) => {
      emit('changeComponent', value);
    };
    const findSellerImage = (id: string) => {
  const seller = sellers.value.find((s: Seller) => s.id === id);
  return seller ? seller.imageUrl : '../../public/seller1.png';
}
    return {
      roundHistory,
      onChange,
      isContentVisible,
      toggleContentVisibility,
      findSellerImage,
      containerClass: computed(() => {
        return isContentVisible.value ? 'history-container' : 'history-container minimized';
      }),
    };
  }
});
</script>

<style scoped>
.seller-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.history-container {
 
  flex-grow: 1;

}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
