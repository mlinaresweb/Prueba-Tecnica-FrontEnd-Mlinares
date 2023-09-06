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
              <td></td>
              <td>{{ item.price }}€</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price }}€</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Resumen de la factura -->
        <div class="invoice-summary">
    <div class="total">
      <span class="label">Total</span>
      <span class="value">{{ factura?.total }}€</span>
    </div>
  </div>
        
        <!-- Términos y condiciones -->
        <h3>Términos y Condiciones</h3>
<div class="terms">
  <p><strong>1. Plazos de Pago:</strong> El pago total de esta factura debe realizarse a más tardar en la fecha de vencimiento indicada.</p>
  <p><strong>2. Penalización por Atraso:</strong> Los pagos realizados después de la fecha de vencimiento podrían incurrir en una tarifa adicional.</p>
  <p><strong>3. Reclamaciones:</strong> Cualquier discrepancia en la factura debe ser comunicada dentro de los 5 días laborables posteriores a su recepción.</p>
  <p><strong>4. Devoluciones:</strong> No se aceptarán devoluciones o cancelaciones de productos o servicios que ya hayan sido entregados o realizados, a menos que se especifique lo contrario.</p>
  <p><strong>5. Confidencialidad:</strong> La información contenida en esta factura es confidencial y sólo debe ser vista por el emisor y el receptor.</p>
</div>
        
        <!-- Notas -->
        <h3>Notas</h3>
        <p></p>
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
    color: red;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 24px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
  }

  h2, h3 {
    font-size: 18px;
    margin-bottom: 16px;
  }
  .terms {
  font-size: 14px;
  margin-bottom: 24px;
}
  .basic-info, .client-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .basic-info div, .client-info div {
    width: 45%;
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
    margin-bottom: 32px;
    border-collapse: collapse;
  }

  .items-table th, .items-table td {
    border: 1px solid #ccc;
    text-align: left;
    padding: 12px;
  }

  .items-table th {
    background-color: #f3f3f3;
  }

  .items-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .invoice-summary {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  .invoice-summary .total {
    font-size: 20px;
    font-weight: bold;
  }

  .invoice-summary .label {
    margin-right: 8px;
  }
</style>