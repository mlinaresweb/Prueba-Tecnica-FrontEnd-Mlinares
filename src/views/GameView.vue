<template>
  <div class="hero">
    
   
    <GameStats></GameStats>
    <BannerComponent></BannerComponent>
    <ImageList></ImageList>
    <RoundsButton></RoundsButton>
    
    <WinnerDisplay></WinnerDisplay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WinnerDisplay from '../components/WinnerDisplay.vue';
import ImageList from '../components/ImageList.vue'; 
import BannerComponent from '@/components/BannerComponent.vue';
import RoundsButton from '@/components/RoundsButton.vue';
import GameStats from '@/components/GameStats.vue';

export default defineComponent({
  components: {
    WinnerDisplay,
    ImageList,
    BannerComponent,
    RoundsButton,
    GameStats
}
});
</script>

<style scoped>
.hero {
  width: calc(100% - 4px);
  margin: 0 auto;

}
</style>
