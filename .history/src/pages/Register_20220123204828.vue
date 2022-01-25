<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div v-if="model.errorMsg" class="mb-10 p-4 rounded bg-light-grey ">
            <p class="text-red-500">{{ model.errorMsg }}</p>
        </div>

        <form @submit.prevent="" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
            <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

            <div class="form-group">
                <label for="email" class="">Email</label>
                <input type="text" required id="email" v-model="model.email">
            </div>
            <div class="form-group">
                <label for="password" class="">Password</label>
                <input type="password" required id="password" v-model="model.password">
            </div>
            <div class="form-group">
                <label for="confirmPassword" class="">Confirm password</label>
                <input type="password" required id="confirmPassword" v-model="model.confirmPassword">
            </div>

            <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:(border-white bg-white text-at-light-green)">Register</button>

            <router-link class="text-sm mt-6 text-center" :to="{name: "Login"}">Already have an account? <span class="text-at-light-green">Login</span></router-link>

        </form>
    </div>
</template>
<script setup lang="ts">
const model = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    errorMsg: '',
})
</script>
<style>
.form-group{
    @apply flex flex-col mb-2;
}

.form-group label{
    @apply mb-1 text-sm text-at-light-green;
}

.form-group input, .form-group textarea{
    @apply p-2 text-gray-500 focus:outline-none;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>