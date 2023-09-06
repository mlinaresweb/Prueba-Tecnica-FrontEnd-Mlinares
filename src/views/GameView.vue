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
      <WinnerDisplay></WinnerDisplay>
    </div>
    <div class="bottom-section">
      <RankingSellers class="ranking-container" />
      <RoundHistorial :containerHeight="rankingHeight" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import WinnerDisplay from '../components/game/WinnerDisplay.vue';
import ImageList from '../components/image/ImageList.vue'; 
import BannerComponent from '@/components/ui/BannerComponent.vue';
import RoundsGame from '@/components/game/RoundsGame.vue';
import RankingSellers from '@/components/game/RankingSellers.vue';
import RoundHistorial from '@/components/game/RoundHistorial.vue';

export default defineComponent({
  components: {
    WinnerDisplay,
    ImageList,
    BannerComponent,
    RoundsGame,
    RankingSellers,
    RoundHistorial
},
setup() {
    const rankingHeight = ref(0);

    onMounted(async () => {
      await nextTick();

      const rankingContainer = document.querySelector('.ranking-container');
      if (rankingContainer) {
        rankingHeight.value = rankingContainer.clientHeight;
      }

      window.addEventListener('resize', () => {
        if (rankingContainer) {
          rankingHeight.value = rankingContainer.clientHeight;
        }
      });
    });

    return {
      rankingHeight,
    };
  },
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
  width: 100%;
  gap: 20px;
  align-items: stretch;
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
  top: 300px; 
  margin-top: 30px; 
  margin-left: 60px;
}
/* Media query para pantallas de tamaño pequeño */
@media (max-width: 768px) {
  .bottom-section {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

.top-section {
  position: relative; 
}

.middle-section {
  position: relative;  
  margin-top: 50px;
}

.rounds-wrapper {
  margin-top: 10px; 

}
</style>