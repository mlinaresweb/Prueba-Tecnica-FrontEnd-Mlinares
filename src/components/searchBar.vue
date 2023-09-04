<!-- ParentComponent.vue -->
<template>
  <form>
       <div class="relative flex"> 
      <SearchDropdown :selectedApi="selectedApi" @setApi="setApi"></SearchDropdown>
      <ImageSelector :selectedApi="selectedApi"></ImageSelector>
    </div>
  </form>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import ImageSelector from './ImageSelector.vue';
  import SearchDropdown from './searchDropdown.vue';
  
  export default {
    components: { ImageSelector, SearchDropdown },
    setup() {
      const selectedApi = ref('google');
  
      const setApi = (api: string) => {
        selectedApi.value = api;
      };
  
      return {
        selectedApi,
        setApi,
      };
    },
  };
  </script>
  