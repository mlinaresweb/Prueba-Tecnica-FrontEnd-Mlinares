<template>
  <div v-if="winner">
    <p>{{ winner.name }} ha ganado la carrera</p>
    <button @click="createFactura">Crear Factura</button>
    <button @click="viewFactura">Ver Factura</button>
    <button @click="resetGame">Reiniciar juego</button>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Factura } from '../store/types/types'; 

export default {
  setup() {
    const store = useStore();
    const winner = computed(() => store.state.game.winner);

    const resetGame = () => {
      store.dispatch('resetGame');
    };

    const createFactura = async () => {
  if (winner.value && winner.value.id) {
    const currentDate = new Date(); 
    const dueDate = new Date(currentDate); 
    dueDate.setMonth(currentDate.getMonth() + 1); 

    const sellerPoints = winner.value.points; 

    const facturaData: Factura = {
      items: [{ id: 1, price: sellerPoints, quantity: 1 }], 
      dueDate,
      date: currentDate,
      client: { id: 1 },
      seller: { id: winner.value.id },
    };

    try {
      await store.dispatch('createFactura', facturaData);
      console.log("Factura e ítem creados exitosamente");
    } catch (error) {
      console.error("Error al crear la factura o el ítem:", error);
    }
  }
};


const viewFactura = async () => {
  const lastFacturaId = store.state.sellers.lastFacturaId;
  if (lastFacturaId) {
    try {
      const facturaData = await store.dispatch('getFactura', lastFacturaId);
      console.log('Datos de la factura:', facturaData);
    } catch (error) {
      console.error("Error al obtener la factura:", error);
    }
  }
};





    return {
      winner,
      resetGame,
      createFactura,
      viewFactura
    };
  },
};
</script>
