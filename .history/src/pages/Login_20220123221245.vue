<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div v-if="errorMsg" class="mb-10 p-4 rounded bg-red-50 border border-red-700 ">
            <p class="text-red-500">{{ errorMsg }}</p>
        </div>

        <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
            <h1 class="text-3xl text-at-light-green mb-4">Login</h1>

            <div class="form-group">
                <label for="email" class="">Email</label>
                <input type="text" id="email" v-model="model.email">
            </div>
            <div class="form-group">
                <label for="password" class="">Password</label>
                <input type="password" id="password" v-model="model.password">
            </div>

            <button type="submit" class="mt-6 btn">Login</button>

           <div class="text-sm mt-6 text-center">
            Don't have an account?  <router-link :to="{name: 'Register'}" class="text-at-light-green hover:underline">Register Here</router-link>
           </div>

        </form>
    </div>
</template>
<script setup lang="ts">import nProgress from 'nprogress';
import { useFlashMessage } from '~/composables/useFlashMessage';
import { supabase } from '~/supabase/init';
const { setMsg } = useFlashMessage();
const model = reactive({
    email: '',
    password: '',
})

const error = ref('');
const errorMsg = computed({
    get(){
        return error.value;
    },
    set(newError: string){
        error.value = 'Error: ' + newError
        setTimeout(() => error.value = '', 5000)
    }
})
const login = async () => {
    if(!model.email || !model.password){
        errorMsg.value = "Email or password is empty";
        setMsg('Email or password is empty')
        return;
    }

    try {
        nProgress.start();
        const {error} = await supabase.auth.signIn({...model})
        if(error) throw error;
        useRouter().push({name: 'Home'});
    } catch (error) {
        errorMsg.value = error.message;
    } finally{
        nProgress.done();
    }
};

</script>

<route lang="yaml">
meta:
  layout: home
</route>