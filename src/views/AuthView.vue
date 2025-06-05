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
  <div
    class="flex flex-col items-center justify-center h-screen bg-cover bg-center"
    style="background-image: url('../img/bg/laptop.jpg')"
  >
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h3 class="font-bold text-lg mb-4">
        {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
      </h3>

      <!-- Formulario de autenticación -->
      <AuthForm :is-login="isLogin" @close-modal="closeModal" />

      <!-- Botón para alternar entre login y registro -->
      <div class="mt-4 text-center">
        <button
          class="btn btn-outline-black w-full mb-2"
          @click="toggleAuthMode"
          v-if="isLogin"
        >
          ¿No tienes cuenta? Regístrate
        </button>
        <button
          class="btn btn-text-gray w-full"
          @click="toggleAuthMode"
          v-else
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.btn-outline-black {
  border: 2px solid black !important;
  color: black;
  border-radius: 9999px !important;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}
.btn-outline-black:hover {
  background-color: black;
  color: white;
}


.btn-text-gray {
  background: none;
  color: gray;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* Full rounded */
  transition: all 0.3s ease;
}
.btn-text-gray:hover {
  color: black;
  text-decoration: underline;
}

/* Fondo de la página */
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}
</style>