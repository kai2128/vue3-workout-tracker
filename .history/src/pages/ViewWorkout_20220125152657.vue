<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="dataLoaded">
      <div class="flex flex-col items-center rounded-md shadow-md bg-light-grey relative p-8">
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2 text-at-light-green text-lg">
          <ph:trash-duotone class="cursor-pointer hover:text-at-green duration-200" @click="deleteWorkouts"></ph:trash-duotone>
          <ph:pencil-line-duotone class="cursor-pointer hover:text-at-green duration-200" @click="toggleEditMode"></ph:pencil-line-duotone>
        </div>
        <ph:person-simple-run-duotone
          class="text-10xl text-at-light-green"
          v-if="data.type == 'cardio'"
        ></ph:person-simple-run-duotone>
        <ph:barbell-fill class="text-10xl text-at-light-green" v-else></ph:barbell-fill>

        <p
          class="py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg"
        >{{ data.type }}</p>

        <input v-if="editMode" class="mt-4 text-3xl text-at-light-green p-2 text-gray-500 focus:outline-none" v-model="data.name" />
        <h1 v-else class="mt-4 text-3xl text-at-light-green">{{data.name}}</h1>
      </div>

      <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md">
        <div v-if="data.type == 'strength'" class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="item.id"
          >
            <div class="item flex-2 md:w-1/3">
              <label for>Exercise</label>
              <input v-if="editMode" type="text" v-model="item.exercise" />
              <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="item flex-1">
              <label for>Sets</label>
              <input v-if="editMode" type="text" v-model="item.sets" />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="item flex-1">
              <label for>Reps</label>
              <input v-if="editMode" type="text" v-model="item.reps" />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="item flex-1">
              <label for>Weight (LB's)</label>
              <input v-if="editMode" type="text" v-model="item.weight" />
              <p v-else>{{ item.weight }}</p>
            </div>
            <ph:trash-simple @click="deleteExercise(index)" class="text-sm absolute cursor-pointer text-at-light-green -left-5 top-0.25 duration-200 hover:text-at-green"></ph:trash-simple>
          </div>
          <button
            v-if="editMode"
            type="button"
            @click="addExercise"
            class="btn self-start"
          >Add Exercise</button>
        </div>
        <div
          v-else
          class="flex flex-col items-center rounded-md shadow-md bg-light-grey relative p-8"
        >
          <div class="flex" v-for="(item, index) in data.exercises" :key="item.id"></div>
        </div>
      </div>
      <button
            v-if="editMode"
            type="button"
            @click="updateWorkout"
            class="btn self-start mt-8"
          >Update Workout</button>
    </div>
    <div v-else>
      <span class="text-xl text-gray-600">The workout you are looking is not available.</span>
    </div>
  </div>
</template>
<style scoped>
.item {
  @apply flex flex-col;
}

.item label {
  @apply text-at-light-green text-xs;
}
.item input {
  @apply p-2 w-full focus:outline-none text-gray-500;
}
</style>
<script setup lang="ts">
import nProgress from "nprogress";
import { uid } from "uid";
import { MessageType, setMsg } from "~/composables/useFlashMessage";
import { useUserStore } from "~/stores/user";
import { supabase } from "~/supabase/init";

const route = useRoute();
const data = ref({});
const dataLoaded = ref(false);

const editMode = ref(false);
const toggleEditMode = () => (editMode.value = !editMode.value);

const { user } = useUserStore();
const router = useRouter();

const currentId = route.params.id;
const getData = async () => {
  try {
    nProgress.start();
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", currentId);
    if (error) throw error;
    data.value = workouts[0];
    dataLoaded.value = true;
  } catch (error) {
    setMsg("Error: " + error.message, MessageType.ERROR);
  } finally {
    nProgress.done();
  }
};
getData();

const addExercise = () => {
  const newExercise = { id: uid() }
    if (data.value.type == 'strength') {
        Object.assign(newExercise, {
            exercise: "",
            sets: "",
            reps: "",
            weight: ""
        })
    } else {
        Object.assign(newExercise, {
            cardioType: "",
            distance: "",
            duration: "",
            pace: "",
        })
    }

  data.value.exercises.push({...newExercise});
};

const deleteExercise = (index) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises.splice(index, 1);
        return
    }
    setMsg('Cannot have 0 exercise', MessageType.ERROR);
};

const updateWorkout = async () => {
  if (data.value.exercises.length <= 0 || data.value.type == 'select-workout') {
        setMsg('Please have at least 1 exercises', MessageType.INFO);
        return
    }
    try {
        const { error } = await supabase.from('workouts').update({...data.value}).eq('id', currentId);
        if (error) throw error;
        setMsg('Success: workout updated', MessageType.SUCCESS);
    } catch (error) {
        setMsg('Error: ' + error.message, MessageType.ERROR);
    }
};

const deleteWorkouts = async () => {
    try {
        const { error } = await supabase.from('workouts').delete().eq('id', currentId);
        if (error) throw error;
        setMsg('Success: workout deleted', MessageType.SUCCESS);
        router.push({name: 'Home'})
    } catch (error) {
        setMsg('Error: ' + error.message, MessageType.ERROR);
    }
};
</script>
<route lang="yaml">
path: /view-workout/:id?
meta:
  layout: home
  auth: true
</route>
