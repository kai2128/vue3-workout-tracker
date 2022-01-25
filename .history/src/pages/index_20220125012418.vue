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
    <div v-if="data.length == 0" class="grid place-items-center w-full gap-y-5">
      <span class="text-2xl">No Workouts currently...</span>
      <router-link class="btn" :to="{name: 'Create'}">Create a workout</router-link>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <router-link class="flex flex-col items-center bg-light-grey cursor-pointer hover:shadow-md duration-200 animate-ease-[cubic-bezier(0.25,0.1,0.25,1)]" to="/" v-for="(workout, index) in data" :key="workout.id">
          <ph:person-simple-run-duotone class="text-5xl text-at-light-green" v-if="workout.type =='cardio'"></ph:person-simple-run-duotone>
          <ph:barbell-light class="text-5xl text-at-light-green" v-else></ph:barbell-light>
          <p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
            {{workout.type}}
          </p>
          <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
            {{workout.name}}
          </h1>
        </router-link>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
