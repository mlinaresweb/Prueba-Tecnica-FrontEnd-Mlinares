<template>
  <div class="search-bar">
       <div class="relative flex"> 
      <SearchDropdown :selectedApi="selectedApi" @setApi="setApi"></SearchDropdown>
      <ImageSelector :selectedApi="selectedApi"></ImageSelector>
    </div>
    </div>
  
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import ImageSelector from '../image/ImageSelector.vue';
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
  <style scoped>
.search-bar{
  width: 65%;
  margin: 0 auto;
  height: max-content;
}
</style>
  