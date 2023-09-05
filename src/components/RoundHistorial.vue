<template>
  <div :class="containerClass">
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

    const onChange = (value: string) => {
      emit('changeComponent', value);
    };

    return {
      roundHistory,
      onChange,
      isContentVisible,
      toggleContentVisibility,
      containerClass: computed(() => {
        return isContentVisible.value ? 'history-container' : 'history-container minimized';
      }),
    };
  }
});
</script>

<style scoped>
.history-container {
  display: flex;
  flex-direction: column;
  width: 220px;
  margin: 20px auto;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: black;
  min-height: 306px;
}

.history-container.minimized {
  min-height: auto;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
