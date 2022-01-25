<template>
        <header class="bg-at-light-green text-white">
            <nav class="container mx-auto py-5 px-4 flex flex-col gap-4 items-center" sm="flex-row">
                <div class="flex items-center gap-x-4">
                    <ph:barbell-duotone class="text-5xl"></ph:barbell-duotone>
                    <h1 class="text-lg">Active Tracker</h1>
                </div>
                <ul class="flex flex-1 justify-end gap-x-10">
                    <router-link class="cursor-pointer" to="/">Home</router-link>
                    <router-link v-if="userStore.loggedIn" class="cursor-pointer" :to="{name: 'Create'}">Create</router-link>
                    <router-link v-if="userStore.loggedOut" class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
                    <li v-if="userStore.loggedIn" class="cursor-pointer" @click="logout">Logout</li>
                </ul>
            </nav>
        </header>
</template>
<script setup lang="ts" >
import { useUserStore } from '~/stores/user';
import { supabase } from '~/supabase/init';

const router = useRouter();
const userStore = useUserStore();
const logout = async () => {
    await supabase.auth.signOut();
    router.push("/")
}
</script>