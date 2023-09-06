<template>
  <div class="container">
    <div class="image-container skeleton-container">
      <div
        class="image-item"
        v-for="index in 6"
        :key="index"
      >
        <div class="image-box skeleton-image"></div>
        <div class="seller-info skeleton-info">
          <div class="seller-details">
            <div class="seller-name skeleton-line"></div>
            <div class="like-button skeleton-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;  
    width: 100%;  
  }
  
  .image-container.skeleton-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    margin-left: 2.5%;
  margin-right: 2.5%;
    width: 100%;
  }
  
  @media (min-width: 640px) {
    .image-container.skeleton-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .image-container.skeleton-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .image-box.skeleton-image {
    position: relative;
    padding-top: 70%;
    overflow: hidden;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 10px;
  }
  
  .seller-info.skeleton-info {
    background-color: #333;
    color: transparent; 
    padding: 10px;
    text-align: center;
    border-radius: 0 0 10px 10px;
    font-weight: 700;
    font-size: 1em;
    position: relative;
  }
  
  .seller-name.skeleton-line, .like-button.skeleton-line {
    background: inherit;
    height: 20px;
    border-radius: 4px;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  </style>
  