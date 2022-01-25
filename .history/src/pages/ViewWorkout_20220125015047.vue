<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div v-if="dataLoaded">
            <div class="flex flex-col items-center rounded-md shadow-md bg-light-grey relative p-8">
                <div v-if="user" class="flex absolute left-2 top-2 gap-x-2 text-at-light-green text-md">
                    <ph:trash-duotone></ph:trash-duotone>   
                    <ph:pencil-line-duotone></ph:pencil-line-duotone>
                </div>
            </div>
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
    data.value = workouts
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
