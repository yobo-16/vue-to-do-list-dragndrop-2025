<script setup>
import { ref, onMounted } from "vue";
import AuthForm from "@/components/AuthForm.vue";


const showAuth = ref(false); // Controla la visibilidad del modal
const isLogin = ref(true); // Controla si el formulario está en modo login o registro




// Alternar entre login y registro
const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
};


// Cerrar el modal
const closeModal = () => {
  showAuth.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- Botón para abrir el modal -->
    <button class="btn btn-primary" @click="showAuth = true">
      Iniciar Sesión / Registrarse
    </button>

    <!-- Modal de DaisyUI -->
    <div v-if="showAuth" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
        </h3>

        <!-- Formulario de autenticación -->
        <AuthForm :is-login="isLogin" @close-modal="closeModal" />

        <!-- Botón para alternar entre login y registro -->
        <div class="modal-action">
          <button class="btn btn-secondary" @click="toggleAuthMode">
            {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
          </button>
          <button class="btn" @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>