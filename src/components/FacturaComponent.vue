<template>
    <div>
      <button @click="createFactura" :disabled="loading">
      <FacturaLoader v-if="loading" />
      <span v-else>Crear Factura</span>
    </button>
    <AlertComponent :show="showAlert" message="Factura creada exitosamente!" />
    <ErrorAlertComponent :show="showErrorAlert" message="Error al crear la factura" />
    <button @click="viewFactura">Ver Factura</button>
    <FacturaModal :showModal="showModal" :factura="currentFactura" @close-modal="showModal = false" />

    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType,ref } from 'vue';
  import { useStore } from 'vuex';
  import { Factura, Seller } from '../store/types/types';
  import FacturaLoader from './FacturaLoader.vue';
  import AlertComponent from './AlertComponent.vue';
  import ErrorAlertComponent from './ErrorAlertComponent.vue';
  import FacturaModal from './FacturaModal.vue';

  export default defineComponent({
    components: {
      FacturaLoader,
      AlertComponent,
      ErrorAlertComponent,
      FacturaModal
  },
    props: {
      winner: {
        type: Object as PropType<Seller>,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
      const loading = ref(false);
      const showAlert = ref(false);
      const showErrorAlert = ref(false);
      const showModal = ref(false);
      const currentFactura = ref<Factura | null>(null);

    const createFactura = async () => {
      loading.value = true;
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
      showAlert.value = true;
      console.log("Factura e ítem creados exitosamente");
    } catch (error) {
      showErrorAlert.value = true;
      console.error("Error al crear la factura o el ítem:", error);
    }
  }
  loading.value = false; 
};

    const viewFactura = async () => {
      showModal.value = true;
      const lastFacturaId = store.state.sellers.lastFacturaId;
      if (lastFacturaId) {
        try {
          const facturaData = await store.dispatch('getFactura', lastFacturaId);
          currentFactura.value = facturaData;
          console.log('Datos de la factura:', facturaData);
        } catch (error) {
          console.error("Error al obtener la factura:", error);
        }
      }
    };

    return {
      loading,
      showAlert,
      showErrorAlert,
      createFactura,
      viewFactura,
      showModal,
      currentFactura
    };
  }
});
</script>