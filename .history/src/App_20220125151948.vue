<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,

import nProgress from 'nprogress';
import { useFlashMessage } from './composables/useFlashMessage';
import { useUserStore } from './stores/user';
import { supabase } from './supabase/init';

// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})
const { flashMessage, msgStyle } = useFlashMessage();
const userStore = useUserStore();
// const appReady = ref(false);

// nProgress.start();


supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN') {
    userStore.setUser(session)
  } else if (event == 'SIGNED_OUT') {
    userStore.setUser(null)
  }
  // appReady.value = true;
})

userStore.setUser(supabase.auth.session());

// if(!user){
//   appReady.value = true;
//   nProgress.done();
// }

</script>

<template>
  <div class="min-h-screen font-Poppins">
    <router-view />
    <transition>
      <div v-if="flashMessage" class="fixed bottom-10 right-30 transition-all duration-200">
        <div
          class="py-2 px-4 text-lg transition-all duration-200"
          :class="msgStyle"
        >{{ flashMessage }}</div>
      </div>
    </transition>
  </div>
</template> 
