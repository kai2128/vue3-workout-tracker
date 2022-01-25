<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div v-if="dataLoaded">
            <div class="flex flex-col items-center rounded-md shadow-md bg-light-grey relative p-8">
                <div v-if="user" class="flex absolute left-2 top-2 gap-x-2 text-at-light-green text-lg">
                    <ph:trash-duotone class="cursor-pointer"></ph:trash-duotone>   
                    <ph:pencil-line-duotone class="cursor-pointer"></ph:pencil-line-duotone>
                </div>
                <ph:person-simple-run-duotone class="text-10xl text-at-light-green" v-if="data.type =='cardio'"></ph:person-simple-run-duotone>
                <ph:barbell-fill class="text-10xl text-at-light-green" v-else></ph:barbell-fill>

                  <p class="mt-6 py-1.5 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
                     {{data.type}}
                 </p>
            </div>
        </div>
        <div v-else>
            <span class="text-xl text-gray-600 text-center">The workout you are looking is not available.</span>
        </div>
    </div>
</template>
<script setup lang="ts">import nProgress from 'nprogress';
import { MessageType, setMsg } from '~/composables/useFlashMessage';
import { useUserStore } from '~/stores/user';
import { supabase } from '~/supabase/init';

const route = useRoute();
const data = ref({});
const dataLoaded = ref(false);

const editMode = ref(false);
const toggleEditMode = () => editMode.value = !editMode.value;

const {user} = useUserStore();

const currentId = route.params.id
const getData = async () => {
  try {
    nProgress.start();
    const {data: workouts, error} = await supabase.from('workouts').select('*').eq('id',currentId);
    if (error) throw error
    data.value = workouts[0]
    dataLoaded.value = true
  } catch (error) {
      setMsg('Error: '+error.message, MessageType.ERROR)
  }finally{
    nProgress.done();
  }
}
getData();
</script>
<route lang="yaml">
path: /view-workout/:id?
meta:
  layout: home
</route>
