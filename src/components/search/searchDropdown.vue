<template>
  <button id="dropdown-button" @click="toggleDropdown" class="flex-shrink-0 z-1000 inline-flex items-center py-1 px-3 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
    {{ selectedApi }}
    <svg class="w-2 h-2 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>

  <div v-if="dropdownOpen" class="absolute top-full left-0 z-10000 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <button @click="setApi('google')" type="button" class="boton inline-flex w-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Google</button>
      </li>
      <li>
        <button @click="setApi('unsplash')" type="button" class="boton inline-flex w-full px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Unsplash</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDropdown } from '../../composables/useDropdown';

export default defineComponent({
  props: {
    selectedApi: {
      type: String,
      required: true,
    },
  },
  emits: ['setApi'],
  setup(props, { emit }) {
    const { dropdownOpen, toggleDropdown } = useDropdown('dropdown-button');

    const setApi = (api: string) => {
      emit('setApi', api);
      dropdownOpen.value = false;
    };

    return {
      toggleDropdown,
      setApi,
      dropdownOpen,
    };
  },
});

</script>

<style scoped>

</style>
