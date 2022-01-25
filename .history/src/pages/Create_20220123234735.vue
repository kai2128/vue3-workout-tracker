<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <div class="flex p-8 items-start bg-light-grey rounded-md shadow-lg">
            <form @submit.prevent="" class="flex flex-col gap-y-5 w-full">
                <h1 class="text-2xl text-at-light-green">Record Workout</h1>

                <div class="form-group">
                    <label for="workout-name">Workout Name</label>
                    <input type="text" required id="workout-name" v-model="workout.name">
                </div>

                 <div class="form-group">
                    <label for="workout-type">Workout Type</label>
                    <select type="text" id="workout-type" v-model="workout.type">
                        <option value="select-workout">Select Workout</option>
                        <option value="strength">Strength Training</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </div>

                <div v-if="workout.type == 'strength'" class="form-group">

                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
type WorkoutType = 'select-workout' | 'strength' | 'cardio'
const workout = reactive({
    name: '',
    type: 'select-workout' as WorkoutType,
    exercises: [],
})

</script>
<route lang="yaml">
meta:
  layout: home
</route>