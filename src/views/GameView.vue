<template>
  <div class="hero">
    <div class="top-section">
      <BannerComponent></BannerComponent>
    </div>
    <div class="rounds-wrapper">
      <RoundsGame></RoundsGame>
    </div>
    <div class="middle-section">
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
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.bottom-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin:  auto; 
  gap: 40px;
}
.top-section{
  position: relative; 

}
.middle-section {
  position: relative;  
  margin-top: 50px;
}

.rounds-wrapper {
  position: absolute;
  top: 270px;  
  margin-left: 60px;
}
</style>