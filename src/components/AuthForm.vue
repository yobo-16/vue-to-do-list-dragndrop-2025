<script setup>

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const isLogin = ref(true);

const _handleSubmit = async () =>{
    try {

        if (isLogin.value){
            await authStore.login(email.value, password.value);
            alert('Login successful');
        } else {
            await authStore.register(email.value, password.value);
            alert('Registration successful');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

</script>

<template>
    <form @submit.prevent="_handleSubmit">
        <h2>{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</h2>
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">{{ isLogin ? "Iniciar Sesión" : "Registrarse" }}</button>
        <button type="button">
            {{ isLogin ? "¿No tienes cuenta? Registrate" : "¿Ya tienes cuenta? Inicia Sesión" }}
        </button>

    </form>
</template>

<style scoped>

</style>