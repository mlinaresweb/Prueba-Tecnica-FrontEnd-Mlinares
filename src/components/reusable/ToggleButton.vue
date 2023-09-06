<template>
  <button @click="toggle">
    <span class="mdi" :class="iconClass"></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  props: {
    isContentVisible: Boolean,
    toggleContentVisibility: Function as PropType<() => void>,
  },
  setup(props) {
    const iconClass = computed(() => {
      return props.isContentVisible ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all';
    });

    return {
      iconClass,
    };
  },
  methods: {
    toggle() {
      if (this.toggleContentVisibility) {
        this.toggleContentVisibility();
      }
    },
  },
});
</script>

<style scoped>
.mdi {
  font-size: 16px;
}
</style>

