<template>
        <header class="bg-at-light-green text-white">
            <nav class="container mx-auto py-5 px-4 flex flex-col gap-4 items-center" sm="flex-row">
                <div class="flex items-center gap-x-4">
                    <ph:barbell-duotone class="text-5xl"></ph:barbell-duotone>
                    <h1 class="text-lg">Active Tracker</h1>
                </div>
                <ul class="flex flex-1 justify-end gap-x-10">
                    <router-link class="cursor-pointer" to="/">Home</router-link>
                    <router-link class="cursor-pointer" to="/">Create</router-link>
                    <router-link class="cursor-pointer" :to="{name: 'Login'}">Login</router-link>
                    <li class="cursor-pointer" @click="logout">Logout</li>
                </ul>
            </nav>
        </header>
</template>
<script setup lang="ts">import { supabase } from '~/supabase/init';

const router = useRouter();
const logout = async () => {
    await supabase.auth.signOut();
    router.push("/")
}
</script>