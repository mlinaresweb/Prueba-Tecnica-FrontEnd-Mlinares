<template>
  <div id="app">
    <ImageSelector />
    <ImageList></ImageList>
    <RoundsGame></RoundsGame>
    <RankingSellers></RankingSellers>
    <WinnerDisplay></WinnerDisplay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ImageSelector from './components/ImageSelector.vue'; 
import WinnerDisplay from './components/WinnerDisplay.vue';
import RankingSellers from './components/RankingSellers.vue';
import RoundsGame from './components/RoundsGame.vue';
import ImageList from './components/ImageList.vue'; 

export default defineComponent({
  components: {
    ImageSelector,
    WinnerDisplay,
    RankingSellers,
    RoundsGame,
    ImageList
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
