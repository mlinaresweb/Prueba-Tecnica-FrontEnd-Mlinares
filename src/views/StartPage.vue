<template>
    <div>
      <h1>Bienvenido a nuestra app</h1>
      <button @click="goToRegister">Registrarse</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
  
      const goToRegister = () => {
        router.push('/register');
      };
  
      return {
        goToRegister,
      };
    },
  });
  </script>
  