<template>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
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
    import { Factura } from '../store/types/types';
    
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
    /* Tus estilos para el modal aquí */
  </style>
  