<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

import { useFlashMessage } from './composables/useFlashMessage';

// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
const {flashMessage, msgStyle} =useFlashMessage();
</script>

<template>
  <div class="min-h-screen font-Poppins">
    <router-view />
    <div class="fixed bottom-10 right-30">
        <div class="py-2 px-4 text-lg transition-all duration-200" :class="msgStyle">{{flashMessage}}</div>
    </div>
  </div>
</template>
