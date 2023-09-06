<template>
    <div class="flex flex-wrap">
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
        </div>
        <div class="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p class="text-center text-3xl font-bold">Welcome back, Olivia</p>
          <p class="mt-2 text-center text-gray-500">Inicia sesion para acceder al juego</p> 
      <div class="relative mt-8 flex h-px place-items-center bg-gray-200">    
      </div>
      <form class="flex flex-col pt-3 md:pt-8">
    <div class="flex flex-col pt-4">
      <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
        <input 
          v-model="name"
          type="text" 
          id="login-name" 
          required 
          class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
          placeholder="Nombre" 
        />
      </div>
    </div>
    <div class="flex flex-col pt-4">
      <div class="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
        <input 
          v-model="email"
          type="email" 
          id="login-email" 
          class="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" 
          placeholder="Email (Opcional)" 
        />
      </div>
    </div>
    <button 
      type="button"
      @click="registerClient"
      class="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
    >
      Registro
    </button>
  </form>
    </div>
  </div>
  <div class="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
    <div class="absolute bottom-0 z-10 px-8 text-white opacity-100">
      <p class="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our compeititors and stay consistant. While they're bogged won with techincal debt, we're realeasing new features.</p>
      <p class="mb-4 text-3xl font-semibold">John Elmond</p>
      <p class="">Founder, Emogue</p>
      <p class="mb-7 text-sm opacity-70">Web Design Agency</p>
    </div>
    <img class="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://images.unsplash.com/photo-1565301660306-29e08751cc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
  </div>
</div>

  </template>
  
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router'; 
  import { useStore } from 'vuex';
  
  export default defineComponent({
    setup() {
      const router = useRouter(); 
      const store = useStore();
      const name = ref('');
      const email = ref('');
  
      const registerClient = async () => {
        const client = { name: name.value, email: email.value };
        try {
          await store.dispatch('createClient', client);
          router.push('/game');  
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
