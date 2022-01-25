<script setup lang="ts">import nProgress from 'nprogress';
import { supabase } from '~/supabase/init';


const data = ref<any>([])
const dataLoaded = ref(false)

const getData = async () => {
  try {
    nProgress.start();
    const {data: workouts, error} = await supabase.from('workouts').select('*');
    if (error) throw error
    data.value = workouts
    dataLoaded.value = true
  } catch (error) {
    console.warn(error)
  }finally{
    nProgress.done();
  }
}
getData();
</script>

<template>
  <div class="container mt-10 mx-auto px-4" v-if="dataLoaded">
    <div v-if="data.length == 0" class="grid place-items-center w-full">
      No Workouts currently...
      <router-link class="btn" :to="{name: 'Create'}">Create a workout</router-link>
    </div>
    <div v-else>
        
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
