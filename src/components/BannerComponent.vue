<template>
  <div class="banner">
    <div class="banner-content">
      <SearchBar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './searchBar.vue';


export default defineComponent({
  components: {
    SearchBar,
  },
});
</script>

<style scoped>


.banner-content {
  text-align: center;
 
  margin: 0 auto;
}
</style>
