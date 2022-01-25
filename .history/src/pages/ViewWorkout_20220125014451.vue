<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
     
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
