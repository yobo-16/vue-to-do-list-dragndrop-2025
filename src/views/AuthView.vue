<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import AuthForm from "@/components/AuthForm.vue";

const authStore = useAuthStore();
const router = useRouter();
const isLogin = ref(true);

// Redirigir al usuario si ya está autenticado
onMounted(() => {
  if (authStore.user) {
    router.push("/projects");
  }
});

// Alternar entre login y registro
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};

// Cerrar el modal (opcional, no se usa aquí pero puede ser útil)
const closeModal = () => {
  console.log("Modal cerrado");
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h3 class="font-bold text-lg mb-4">
        {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
      </h3>

      <!-- Formulario de autenticación -->
      <AuthForm :is-login="isLogin" @close-modal="closeModal" />

      <!-- Botón para alternar entre login y registro -->
      <div class="mt-4 text-center">
        <button class="btn btn-secondary" @click="toggleAuthMode">
          {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>