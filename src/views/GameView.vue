<template>
    <div>
      <SearchBar></SearchBar>
      <ImageList></ImageList>
      <RoundsGame></RoundsGame>
      <RankingSellers></RankingSellers>
      <RoundHistorial></RoundHistorial>
      <WinnerDisplay></WinnerDisplay>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import WinnerDisplay from '../components/WinnerDisplay.vue';
  import RankingSellers from '../components/RankingSellers.vue';
  import RoundsGame from '../components/RoundsGame.vue';
  import RoundHistorial from '../components/RoundHistorial.vue'; 
  import ImageList from '../components/ImageList.vue'; 
import SearchBar from '@/components/searchBar.vue';
  
  export default defineComponent({
    components: {
    WinnerDisplay,
    RankingSellers,
    RoundsGame,
    ImageList,
    RoundHistorial,
    SearchBar
}
  });
  </script>
  