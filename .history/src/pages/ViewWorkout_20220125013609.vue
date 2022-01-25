<template>

</template>
<script setup lang="ts">import { supabase } from '~/supabase/init';

const route = useRoute();
const data = ref({});

const currentId = route.params.id
// supabase

</script>
<route lang="yaml">
path: /view-workout/:id?
meta:
  layout: home
</route>
