<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";

const email = ref(""); // Valor predeterminado

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();


watch(
  () => user.value,
  (newUser) => {
    if (newUser && newUser.email) {
      email.value = newUser.email;
    } 
  },
  { immediate: true }
);

</script>

<template>
    <div class="hero min-h-screen"
        style="background-image: url(src/img/desktop.jpg);">
        <div class="hero-overlay"></div>
        <div class="hero-content text-neutral-content text-center">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-normal">
                    Hola
                    <br>
                    {{ email}}
                </h1>
                <p class="mb-5">
                    Este es unn to-do list interactivo que he desarrollado con Vue.js y Pinia como proyexto final de un Bootcamp.
                </p>
                <!-- <button class="btn btn-primary">Get Started</button> -->
                <RouterLink v-if="!user" class="btn  btn-outline-white" to="/auth">Comienza ahora</RouterLink>
                <RouterLink v-if="user" class="btn  btn-outline-white" to="/projects">Comienza ahora</RouterLink>
            </div>
        </div>
    </div>
</template>



<style scoped>

    .btn-outline-white {
        border: 2px solid white !important;
        background: none;
        color: white;
        border-radius: 9999px !important;
        padding: 0.5rem 1rem;
        transition: all 0.3s ease;
    }
    .btn-outline-white:hover {
        background-color: white;
        color: black;
    }
</style>