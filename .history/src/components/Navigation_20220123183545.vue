<template>
        <header class="bg-at-light-green text-white">
            <nav class="container py-5 px-4 flex flex-col gap-4 items-center" sm="flex-row">
                <div class="flex item-center gap-x-4">
                    <bx:bx-dumbbell></bx:bx-dumbbell>
                    <h1 class="text-lg">Active Tracker</h1>
                </div>
                <ul class="flex flex-1 justify-end gap-x-10">
                    <router-link class="cursor-pointer" :to="{name: 'Home'}">Home</router-link>
                    <router-link class="cursor-pointer" :to="{name: ''}">Create</router-link>
                    <router-link class="cursor-pointer" :to="{name: ''}">Login</router-link>
                    <li class="cursor-pointer">Logout</li>
                </ul>
            </nav>
        </header>
</template>
<script setup lang="ts">

</script>