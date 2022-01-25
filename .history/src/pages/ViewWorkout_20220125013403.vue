<template>

</template>
<script setup lang="ts">import { supabase } from '~/supabase/init';

const props = defineProps();
console.log(props.id)
// supabase

</script>
<route lang="yaml">
path: /view-workout/:id?
props: true
meta:
  layout: home
</route>
