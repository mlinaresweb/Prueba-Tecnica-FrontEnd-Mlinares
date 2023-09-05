<template>
      
      <router-view></router-view>
   
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  components: {
   
  }
});
</script>

<style>
  .app-container {
    display: flex;
    width: 100%;
  }
  .content {
    flex-grow: 1;
  }
</style>
