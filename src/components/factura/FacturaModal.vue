<template>
    <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close mdi mdi-close" @click="closeModal"></span>
      <h1>Factura</h1>
        
        <!-- Información básica -->
        <div class="basic-info">
          <div>
            <strong>ID: </strong> {{ factura?.id }}
          </div>
          <div>
            <strong>Fecha de Creación: </strong> {{ factura?.date }}
          </div>
          <div>
            <strong>Fecha de Vencimiento: </strong> {{ factura?.dueDate }}
          </div>
        </div>
        
        <!-- Detalles del cliente -->
        <h2>Cliente</h2>
        <div class="client-info">
          <div>
            <strong>Nombre: </strong> {{ factura?.client?.name }}
          </div>
          <div>
            <strong>ID: </strong> {{ factura?.client?.id }}
          </div>
          <!-- Añadir más campos del cliente aquí -->
        </div>
        
        <!-- Detalles de los ítems -->
        <h2>Ítems</h2>
        <table class="items-table">
          <thead>
            <tr>
              <th>Ítem</th>
              <th>Referencia</th>
              <th>Precio</th>
              <th>Desc %</th>
              <th>Impuesto</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in factura?.items" :key="item.id">
              <td>{{ item.name }}</td>
              <td><!-- Referencia aquí --></td>
              <td>{{ item.price }}€</td>
              <td><!-- Descuento aquí --></td>
              <td><!-- Impuesto aquí --></td>
              <td><!-- Descripción aquí --></td>
              <td>{{ item.quantity }}</td>
              <!-- <td>{{ item.price * item.quantity }}€</td> -->
              <td>{{ item.price }}€</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Resumen de la factura -->
        <div class="invoice-summary">
          <div><strong>Base imponible:</strong> <!-- Base imponible aquí -->€</div>
          <div><strong>Descuento:</strong> -<!-- Descuento aquí -->€</div>
          <div><strong>Subtotal:</strong> <!-- Subtotal aquí -->€</div>
          <div><strong>Total:</strong> {{ factura?.total }}€</div>
        </div>
        
        <!-- Términos y condiciones -->
        <h3>Términos y Condiciones</h3>
        <p><!-- Añadir términos y condiciones aquí --></p>
        
        <!-- Notas -->
        <h3>Notas</h3>
        <p><!-- Añadir notas aquí --></p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { Factura } from '../../store/types/types';
    
    export default defineComponent({
      props: {
        showModal: {
          type: Boolean,
          default: false
        },
        factura: {
          type: Object as PropType<Factura | null | undefined>,
          required: false,
          default: null
        },
      },
      methods: {
        closeModal() {
          this.$emit('close-modal');
        }
      }
    });
  </script>
  
  <style scoped>
  /* Estilos para el modal */
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
  
  .modal-content {
    width: 80%;
    max-width: 800px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    position: relative;
  }
  .close {
    /* Añade color rojo al icono de cerrar */
    color: red;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
  }

  h1, h2, h3 {
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
  }
  
  .basic-info, .client-info, .invoice-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .items-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .items-table th,
  .items-table td {
    border: 1px solid #ccc;
    text-align: left;
    padding: 10px;
  }

  .items-table th {
    background-color: #f3f3f3;
  }

  .items-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .invoice-summary {
    align-self: flex-end;
  }
  
  /* Añade más estilos aquí según tus necesidades */
</style>