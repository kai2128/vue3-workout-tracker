<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="dataLoaded">
      <div class="flex flex-col items-center rounded-md shadow-md bg-light-grey relative p-8">
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2 text-at-light-green text-lg">
          <ph:trash-duotone class="cursor-pointer" @click="deleteWorkouts"></ph:trash-duotone>
          <ph:pencil-line-duotone class="cursor-pointer" @click="toggleEditMode"></ph:pencil-line-duotone>
        </div>
        <ph:person-simple-run-duotone
          class="text-10xl text-at-light-green"
          v-if="data.type == 'cardio'"
        ></ph:person-simple-run-duotone>
        <ph:barbell-fill class="text-10xl text-at-light-green" v-else></ph:barbell-fill>

        <p
          class="mt-1 py-1.5 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg"
        >{{ data.type }}</p>

        <h1 class="mt-3 text-2xl text-at-light-green">{{data.name}}</h1>
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
import { MessageType, setMsg } from "~/composables/useFlashMessage";
import { useUserStore } from "~/stores/user";
import { supabase } from "~/supabase/init";

const route = useRoute();
const data = ref({});
const dataLoaded = ref(false);

const editMode = ref(false);
const toggleEditMode = () => (editMode.value = !editMode.value);

const { user } = useUserStore();

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

const addExercise = () => { };

const deleteExercise = (index) => { };

const updateExercise = () => { };

const deleteWorkouts = () => { };
</script>
<route lang="yaml">
path: /view-workout/:id?
meta:
  layout: home
  auth: true
</route>
