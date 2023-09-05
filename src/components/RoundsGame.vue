<template>
  <div class="rounds-container">
    <div class="round-circle">
      <h2 class="round-number">{{ round }}</h2>
    </div>
    <h2 class="rounds-title">Ronda</h2>
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
  flex-direction: column;
  align-items: center;
  max-width: 130px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.round-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(to right, #2248f1, #3395f0);
  border-radius: 50%;
}

.round-number {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.rounds-title {
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  text-align: center;
}
</style>
