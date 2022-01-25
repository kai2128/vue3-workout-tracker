<script setup lang="ts">import nProgress from 'nprogress';
import { useUserStore } from '~/stores/user';
import { supabase } from '~/supabase/init';

const {user} = useUserStore();
const user_id = user?.user?.id;
const data = ref<any>([])
const dataLoaded = ref(false)

const getData = async () => {
  try {
    nProgress.start();
    if(user_id){
      const {data: workouts, error} = await supabase.from('workouts').select('*').eq('user_id', user_id);
    }else{
      const {data: workouts, error} = await supabase.from('workouts').select('*');
    }
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
        <router-link class="p-8 flex flex-col items-center bg-light-grey cursor-pointer rounded-lg hover:shadow-md duration-200 animate-ease-[cubic-bezier(0.25,0.1,0.25,1)]" :to="{name : 'ViewWorkout', params: {id: workout.id}}" v-for="(workout, index) in data" :key="workout.id">
          <ph:person-simple-run-duotone class="text-8xl text-at-light-green" v-if="workout.type =='cardio'"></ph:person-simple-run-duotone>
          <ph:barbell-fill class="text-8xl text-at-light-green" v-else></ph:barbell-fill>
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
name: Home
meta:
  layout: home
  auth: false
</route>
