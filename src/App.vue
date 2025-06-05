<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from "@/stores/auth";

import Navbar from '@/components/Navbar.vue';
import Footer from './components/Footer.vue';
const authStore = useAuthStore();

// Obtenemos el user en toda la app
onMounted(async () => {
  await authStore.fetchUser(); 
});

console.log("Usuario sincronizado en App.vue:", authStore.user);
</script>

<template>
  <header>
    <Navbar />

    

  </header>



  <RouterView />
  <Footer />
</template>

<style scoped></style>
