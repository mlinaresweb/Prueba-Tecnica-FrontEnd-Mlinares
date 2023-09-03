<template>
    <div>
      <button @click="createFactura">Crear Factura</button>
      <button @click="viewFactura">Ver Factura</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useStore } from 'vuex';
  import { Factura, Seller } from '../store/types/types';
  
  export default defineComponent({
    props: {
      winner: {
        type: Object as PropType<Seller>,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
  
    const createFactura = async () => {
  if (props.winner && props.winner.id) {
    const currentDate = new Date(); 
    const dueDate = new Date(currentDate); 
    dueDate.setMonth(currentDate.getMonth() + 1); 

    const totalPoints = store.state.sellers.sellers.reduce((total: number, seller: Seller) => total + seller.points, 0);

    const facturaData: Factura = {
      items: [{ id: 1, price: totalPoints, quantity: 1 }],  
      dueDate,
      date: currentDate,
      client: { id: 1 },
      seller: { id: props.winner.id },
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
        createFactura,
        viewFactura
      };
    }
  });
  </script>
  