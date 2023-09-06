<template>
    <div>
      <input v-model="name" placeholder="Nombre" />
      <input v-model="email" placeholder="Correo electrónico" />
      <button @click="registerClient">Registrar</button>
    </div>
  </template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router'; // Importar useRouter
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const router = useRouter(); // Utilizar el router
      const store = useStore();
      const name = ref('');
      const email = ref('');
  
      const registerClient = async () => {
        const client = { name: name.value, email: email.value };
        try {
          await store.dispatch('createClient', client);
          router.push('/game');  // Redireccionar al juego
        } catch (error) {
          console.error("Error al registrar el cliente:", error);
        }
      };
  
      return {
        name,
        email,
        registerClient,
      };
    }
  });
</script>
