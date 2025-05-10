<!-- <script setup>

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

</style> -->

<!-- filepath: /Users/robertledezma/Documents/ironhack/final-project/vue-to-do-list-dragndrop-2025/src/components/AuthForm.vue -->
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close-modal"]);

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const _handleSubmit = async () => {
  try {
    if (props.isLogin) {
      await authStore.login(email.value, password.value);
      alert("Inicio de sesión exitoso");
    } else {
      await authStore.register(email.value, password.value);
      alert("Registro exitoso");
    }
    emit("close-modal"); // Cerrar el modal después de la acción
  } catch (error) {
    console.error("Error:", error);
    alert("Error: " + error.message);
  }
};
</script>

<template>
  <form @submit.prevent="_handleSubmit" class="flex flex-col gap-4">
    <input
      type="email"
      v-model="email"
      placeholder="Correo electrónico"
      class="input input-bordered w-full"
      required
    />
    <input
      type="password"
      v-model="password"
      placeholder="Contraseña"
      class="input input-bordered w-full"
      required
    />
    <button type="submit" class="btn btn-primary w-full">
      {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
    </button>
  </form>
</template>

<style scoped>
/* Estilo opcional */
</style>