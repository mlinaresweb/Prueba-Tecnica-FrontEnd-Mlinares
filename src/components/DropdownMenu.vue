<template>
    <div class="dropdown-menu" ref="dropdownRef">
      <div @click="toggleDropdown">
        <span>{{ title }}</span>
        <span class="icon">▼</span>
      </div>
      <div v-if="dropdownOpen" class="options">
        <div
          class="option"
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useDropdown } from '../composables/useDropdown';
  import { hashString } from '../utils/stringUtils'; 
  import { DropdownOption } from '../store/types/types';


  
  export default defineComponent({
    props: {
      title: {
        type: String,
        required: true,
      },
      options: {
        type: Array as () => DropdownOption[],
        required: true,
      },
    },
    setup(props, { emit }) {
      const dropdownRef = ref<HTMLElement | null>(null);
  
      let dropdownId = 'dropdown-' + hashString(props.title + JSON.stringify(props.options));
  
      const { dropdownOpen, toggleDropdown } = useDropdown(dropdownId);
  
      onMounted(() => {
        if (dropdownRef.value) {
          dropdownRef.value.id = dropdownId;
        }
      });
  
      const selectOption = (option: DropdownOption) => {
        emit('change', option.value);
        dropdownOpen.value = false;
      };
  
      return {
        dropdownRef,
        dropdownOpen,
        toggleDropdown,
        selectOption,
      };
    },
  });
  </script>
  
  
  
  <style scoped>
  .dropdown-menu {
    position: relative;
  }
  
  .options {
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid #ccc;
    background-color: #ffffff; 
  }
  
  .option {
    padding: 8px;
    cursor: pointer;
  }
  
  .option:hover {
    background-color: #f0f0f0;
  }
</style>
