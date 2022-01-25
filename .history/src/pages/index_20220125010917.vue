<script setup lang="ts">import { supabase } from '~/supabase/init';


const data = ref<any>([])
const dataLoaded = ref(false)

const getData = async () => {
  try {
    const {data: workouts, error} = await supabase.from('workouts').select('*');
    if (error) throw error
    data.value = workouts
    dataLoaded.value = true
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  Home
</template>

<route lang="yaml">
meta:
  layout: home
</route>
