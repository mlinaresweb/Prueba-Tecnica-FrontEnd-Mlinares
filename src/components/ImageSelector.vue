<template>
  <div>
    <input v-model="query" @input="loadImages" />
    <div class="image-container">
      <div class="image-item" v-for="item in imageItems.slice(0, 5)" :key="item.id">
  <img
    class="image"
    :class="{ selected: item.id === selectedImageId }"  
    :src="item.url"
    @error="handleImageError(item.id)"
    @click="selectImage(item.id, item.seller.id)"
  />
        <p>{{ item.seller.name }}: {{ item.seller.points }}</p>
      </div>
    </div>
    <div>
      <p>Ronda: {{ round }}</p>
      <button @click="endRound">Finalizar ronda</button>
    </div>
    <div>
      <h2>Ranking de Vendedores</h2>
      <ul>
        <li v-for="seller in sellersSortedByPoints" :key="seller.id">
          {{ seller.name }}: {{ seller.points }}
        </li>
      </ul>
    </div>
  </div>
</template>



<script lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { fetchImages } from '../services/googleImageService';
import { ImageItem } from "../store/types/types";


export default {
    setup() {
        const store = useStore();
        const query = ref('');
        const imageItems = ref<ImageItem[]>([]);
        const extraImages = ref<ImageItem[]>([]);
        const round = computed(() => store.state.game.round);
        const selectedImages = computed(() => store.state.images.selectedImages);
        const selectedSeller = ref<string | null>(null); // Nuevo estado para almacenar el vendedor seleccionado temporalmente
        const selectedImageId = ref<string | null>(null); // Nuevo estado para almacenar el ID de la imagen seleccionada
          const winner = computed(() => store.state.game.winner); // Nueva propiedad computada para el ganador

        const isValidImage = async (url: string) => {
            return new Promise<boolean>((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        };
       
        const loadImages = async () => {
          if (winner.value) {
                alert("El juego ha terminado, no se pueden cargar más imágenes.");
                return; // Terminar la función si hay un ganador
            }
            if (query.value) {
                let images = await fetchImages(query.value, 10);
                const sellers: any = store.state.sellers.sellers;
                images = await Promise.all(images.map(async (image: ImageItem) => {
                    if (await isValidImage(image.url)) {
                        return image;
                    }
                    return null;
                }));
                images = images.filter((image: ImageItem | null) => image !== null);
                imageItems.value = images.map((image: ImageItem, index: number) => {
                    return {
                        id: image.id,
                        url: image.url,
                        seller: sellers[index % sellers.length]
                    };
                });
                extraImages.value = imageItems.value.slice(5);
            }
        };
        
        const handleImageError = (id: string) => {
            const index = imageItems.value.findIndex(item => item.id === id);
            if (index !== -1 && extraImages.value.length > 0) {
                const [replacement] = extraImages.value.splice(0, 1);
                imageItems.value.splice(index, 1, replacement);
            }
        };
       
        const addPoints = (sellerId: string) => {
            store.commit('game/addPoints', sellerId);
        };
       
        const sellersSortedByPoints = computed(() => {
            return [...store.state.sellers.sellers].sort((a, b) => b.points - a.points);
        });
        
        const selectImage = (imageId: string, sellerId: string) => {
            console.log('Image ID:', imageId); // Depuración
            console.log('Seller ID:', sellerId); // Depuración
            if (selectedImageId.value === imageId) {
                selectedImageId.value = null; // Desseleccionar si se vuelve a hacer clic
            }
            else {
                selectedImageId.value = imageId; // Actualizar el ID de la imagen seleccionada
                selectedSeller.value = sellerId; // Actualizar el vendedor seleccionado
            }
        };
        
        const endRound = () => {
            if (selectedSeller.value) {
                store.dispatch('addPoints', selectedSeller.value); // Sumar puntos al finalizar la ronda
            }
            store.commit('incrementRound'); // Avanzar la ronda
            query.value = ''; // Limpiar la consulta
            imageItems.value = []; // Limpiar las imágenes
            selectedSeller.value = null; // Limpiar el vendedor seleccionado
            selectedImageId.value = null; // Limpiar la imagen seleccionada
        };
        return {
            query,
            imageItems,
            loadImages,
            addPoints,
            handleImageError,
            round,
            endRound,
            selectedImages,
            selectImage,
            sellersSortedByPoints,
            selectedSeller,
            selectedImageId,
            winner
        };
    },
};
</script>
<style scoped>
.image-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
}

.image-item {
  flex: 1;
  text-align: center;
}

.image {
  width: 100px; /* o cualquier otro tamaño que te parezca adecuado */
  height: 100px;
  object-fit: cover;
}
.selected {
  border: 2px solid blue;
}
</style>
