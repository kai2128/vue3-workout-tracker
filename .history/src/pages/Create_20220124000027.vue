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
                    <select id="workout-type" v-model="workout.type">
                        <option value="select-workout">Select Workout</option>
                        <option value="strength">Strength Training</option>
                        <option value="cardio">Cardio</option>
                    </select>
                </div>

                <div v-if="workout.type == 'strength'" class="form-group gap-y-4">
                    <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in workout.exercises" :key="index">
                        <div class="flex flex-col md:w-1/3">
                            <label for="exercise-name" class="mb-1 text-sm text-at-light-green">Exercise</label>
                            <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" id="exercise-name" v-model="item.exercise">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label for="sets" class="mb-1 text-sm text-at-light-green">Sets</label>
                            <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" id="sets" v-model="item.sets">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label for="reps" class="mb-1 text-sm text-at-light-green">Reps</label>
                            <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" id="reps" v-model="item.reps">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label for="weight" class="mb-1 text-sm text-at-light-green">Weight (LB's)</label>
                            <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" id="reps" v-model="item.weight">
                        </div>
                        <ph:trash-duotone class="text-sm absolute -left-5 cursor-pointer"></ph:trash-duotone>
                        <button class="btn" type="button">Add Exercise</button>
                    </div>
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
    exercises: [1],
})

</script>
<route lang="yaml">
meta:
  layout: home
</route>
<style>

</style>