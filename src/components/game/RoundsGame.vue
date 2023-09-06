<template>
  <div class="rounds-container flex items-center justify-between">
    <div class="round-circle flex items-center justify-center">
      <h2 class="round-number text-white text-lg font-bold">{{ round }}</h2>
    </div>
    <h2 class="rounds-title text-base font-medium">Ronda</h2>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const round = computed(() => store.state.game.round);
  
    return {
      round,
    };
  }
};
</script>

<style scoped>
.rounds-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 100%;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1); 

}

.round-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: linear-gradient(to right, #2248f1, #3395f0);
  border-radius: 50%;
}

.round-number {
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.rounds-title {
  font-size: 1rem;
  font-weight: 500;
  margin-left: 8px;
  text-align: center;
}

@media (max-width: 768px) {
  .round-circle {
    width: 20px;
    height: 20px;
  }
  .round-number {
    font-size: 0.75rem;
  }
  .rounds-title {
    font-size: 0.75rem;
  }
}
</style>