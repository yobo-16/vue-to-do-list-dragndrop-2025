
<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router"; 


const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close-modal"]);

const authStore = useAuthStore();
const router = useRouter();
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
    emit("close-modal"); 
    router.push("/projects");
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
    <button type="submit" class="btn w-full btn-inicio">
      {{ isLogin ? "Iniciar Sesión" : "Registrarse" }}
    </button>
  </form>
</template>

<style scoped>

.btn-inicio{
  /* border: 2px solid black !important; */
  background-color: black;
  color: white;
  border-radius: 9999px !important;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-inicio:hover {
  background-color: #5a5a5a;
  color: white;
}

.input{
  border-radius: 32px;
}

</style>