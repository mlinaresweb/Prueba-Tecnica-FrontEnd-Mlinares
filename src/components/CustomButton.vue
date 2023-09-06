<template>
    <button 
      type="button"
      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
      @click="handleClick"
    >
      {{ buttonText }}
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      buttonText: {
        type: String as PropType<string>,
        required: true
      },
      onClick: {
        type: Function as PropType<() => void>,
        required: true
      }
    },
    methods: {
      handleClick() {
        this.onClick();
      }
    }
  });
  </script>
  