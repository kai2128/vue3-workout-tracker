<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div v-if="model.errorMsg" class="mb-10 p-4 rounded bg-light-grey ">
            <p class="text-red-500">{{ model.errorMsg }}</p>
        </div>

        <form @submit.prevent="" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
            <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

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

            <button type="submit" class="mt-6 btn">Register</button>

           <div class="text-sm mt-6 text-center">
            Already have an account?  <router-link :to="{name: 'Login'}" class="text-at-light-green hover:underline">Login</router-link>
           </div>

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

<route lang="yaml">
meta:
  layout: home
</route>