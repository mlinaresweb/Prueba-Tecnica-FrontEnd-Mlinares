<template>
  <div class="relative">
    <img src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" class="absolute inset-0 object-cover w-full h-full" alt="" />
    <!-- Capa semi-transparente para oscurecer la imagen -->
    <div class="absolute inset-0 bg-black opacity-70"></div>
    <div class="relative bg-opacity-75">
      <svg class="absolute inset-x-0 bottom-0 text-white" viewBox="10 0 926 155">
        <path
          fill="currentColor"
          d="M-150 100C-104 100 -44 100 20 100C196 100 316 150 436 152C556 154 676 127 796 110C916 93 1036 90 1156 85C1216 83 1276 80 1276 80V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V100Z"></path>
      </svg>
      <div class="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <!-- Contenedor para el logo y el título -->
        <div class="relative justify-center mb-12 top-1/4 left-1/2 transform -translate-x-1/2 flex items-center z-10">
          <!-- Logo -->
          <img src="../assets/mundo-logo.png" class="w-32 h-32" alt="Logo">
          <!-- Título -->
          <h1 class="ml-4 text-4xl text-white">IMÁGENES DEL MUNDO</h1>
        </div>
        <!-- Search bar -->
        <SearchBar class="absolute w-full bottom-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000"></SearchBar>
      </div>
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
