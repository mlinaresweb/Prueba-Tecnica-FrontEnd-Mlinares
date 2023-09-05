<template>
  <div class="hero">
    <div class="top-section">
      <BannerComponent></BannerComponent>
    </div>
    <div class="middle-section">
      <RoundsGame></RoundsGame>
      
      <ImageList></ImageList>
      <RoundsButton></RoundsButton>
     
      <WinnerDisplay></WinnerDisplay>
    </div>
    <div class="bottom-section">
      
      <RankingSellers></RankingSellers>
      <RoundHistorial></RoundHistorial>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WinnerDisplay from '../components/WinnerDisplay.vue';
import ImageList from '../components/ImageList.vue'; 
import BannerComponent from '@/components/BannerComponent.vue';
import RoundsButton from '@/components/RoundsButton.vue';
import RoundsGame from '@/components/RoundsGame.vue';
import RankingSellers from '@/components/RankingSellers.vue';
import RoundHistorial from '@/components/RoundHistorial.vue';

export default defineComponent({
  components: {
    WinnerDisplay,
    ImageList,
    BannerComponent,
    RoundsButton,
    RoundsGame,
    RankingSellers,
    RoundHistorial
}
});
</script>

<style scoped>
.hero {
  width: calc(100% - 4px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.bottom-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin:  auto; /* Centra el contenedor en la página */
  gap: 40px;
}
</style>