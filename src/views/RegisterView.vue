<!-- RegisterComponent.vue -->

<template>
    <div>
      <input v-model="name" placeholder="Nombre" />
      <input v-model="email" placeholder="Correo electrónico" />
      <button @click="registerClient">Registrar</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const store = useStore();
      const name = ref('');
      const email = ref('');
  
      const registerClient = async () => {
        const client = { name: name.value, email: email.value };
        await store.dispatch('createClient', client);
      };
  
      return {
        name,
        email,
        registerClient,
      };
    }
  });
  </script>
  