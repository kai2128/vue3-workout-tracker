<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <div class="flex p-8 items-start bg-light-grey rounded-md shadow-lg">
            <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">
                <h1 class="text-2xl text-at-light-green">Record Workout</h1>

                <div class="form-group">
                    <label for="workout-name">Workout Name</label>
                    <input type="text" required id="workout-name" v-model="workout.name" />
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
                    <div
                        class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                        v-for="(item, index) in workout.exercises"
                        :key="index"
                    >
                        <div class="flex flex-col md:w-1/3">
                            <label
                                :for="'exercise-name' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Exercise</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'exercise-name' + index"
                                v-model="item.exercise"
                            />
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'sets' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Sets</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'sets' + index"
                                v-model="item.sets"
                            />
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'reps' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Reps</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'reps' + index"
                                v-model="item.reps"
                            />
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'weight' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Weight (LB's)</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'weight' + index"
                                v-model="item.weight"
                            />
                        </div>
                        <ph:trash-duotone
                            @click="deleteExercise"
                            class="text-md text-at-light-green absolute -left-5 cursor-pointer mt-0.5"
                        ></ph:trash-duotone>
                    </div>
                    <button class="btn" type="button" @click="addExercise">Add Exercise</button>
                </div>

                <div v-if="workout.type == 'cardio'" class="form-group gap-y-4">
                    <div
                        class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
                        v-for="(item, index) in workout.exercises"
                        :key="index"
                    >
                        <div class="flex flex-col md:w-1/3">
                            <label
                                :for="'cardio-type' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Type</label>
                            <select
                                required
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'cardio-type' + index"
                                v-model="item.cardioType"
                            >
                                <option value>Select Type</option>
                                <option value="run">Runs</option>
                                <option value="walk">Walk</option>
                            </select>
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'distance' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Distance</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="`distance${index}`"
                                v-model="item.distance"
                            />
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'duration' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Duration</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'duration' + index"
                                v-model="item.duration"
                            />
                        </div>
                        <div class="flex flex-col flex-1">
                            <label
                                :for="'pace' + index"
                                class="mb-1 text-sm text-at-light-green"
                            >Pace</label>
                            <input
                                required
                                type="text"
                                class="p-2 w-full text-gray-500 focus:outline-none"
                                :id="'pace' + index"
                                v-model="item.pace"
                            />
                        </div>
                        <ph:trash-duotone
                            @click="deleteExercise(index)"
                            class="text-md text-at-light-green absolute -left-5 cursor-pointer mt-0.5"
                        ></ph:trash-duotone>
                    </div>
                    <button class="btn" type="button" @click="addExercise">Add Exercise</button>
                </div>

                <button class="btn" type="submit">Record Workout</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { uid } from 'uid';
import { MessageType, setMsg } from '~/composables/useFlashMessage';
import { supabase } from '~/supabase/init';
type WorkoutType = 'select-workout' | 'strength' | 'cardio'
const workout = reactive({
    name: '',
    type: 'select-workout' as WorkoutType,
    exercises: [{}],
})

const addExercise = () => {
    const newExercise = { id: uid() }
    if (workout.type == 'select-workout') {
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
    workout.exercises.push(newExercise);
}

const deleteExercise = (index: number) => {
    if (workout.exercises.length > 1) {
        workout.exercises.splice(index, 1);
        return
    }
    setMsg('Cannot have 0 exercise', MessageType.ERROR);
}

watch(() => workout.type, () => {
    workout.exercises.length = 0;
    addExercise();
})

const createWorkout = async () => {
    if (workout.exercises.length <= 0 || workout.type == 'select-workout') {
        setMsg('Please select type and add exercise', MessageType.INFO);
        return
    }
    try {
        const { error } = await supabase.from('workouts').insert([{
            ...workout
        }])
        if (error) throw error;
        setMsg('Success: workout created', MessageType.SUCCESS);
        Object.assign(workout, {
            name: '',
            type: 'select-workout' as WorkoutType,
            exercises: [{}],
        })
    } catch (error) {
        setMsg('Error: ' + error.message, MessageType.ERROR);
    }
}

</script>
<route lang="yaml">
meta:
  layout: home
  auth: true
</route>
<style>
</style>