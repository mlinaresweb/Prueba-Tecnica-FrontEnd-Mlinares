<template>
    <div>
      <ImageSelector />
      <ImageList></ImageList>
      <RoundsGame></RoundsGame>
      <RankingSellers></RankingSellers>
      <WinnerDisplay></WinnerDisplay>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import ImageSelector from '../components/ImageSelector.vue'; 
  import WinnerDisplay from '../components/WinnerDisplay.vue';
  import RankingSellers from '../components/RankingSellers.vue';
  import RoundsGame from '../components/RoundsGame.vue';
  import ImageList from '../components/ImageList.vue'; 
  
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
  