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
    <div class="fixed ">
        <div>test</div>
    </div>
  </div>
</template>
