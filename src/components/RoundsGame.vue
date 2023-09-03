<template>
    <div>
      <p>Ronda: {{ round }}</p>
      <RoundsButton></RoundsButton>
    </div>
  </template>
<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import RoundsButton from './RoundsButton.vue';
export default {
  setup() {
    const store = useStore();
    const round = computed(() => store.state.game.round);
  
    return {
      round,
    };
  }, components:
  {
    RoundsButton
  }
};
</script>
