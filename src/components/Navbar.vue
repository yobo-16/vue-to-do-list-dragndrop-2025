<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";

const email = ref("AI"); // Valor predeterminado

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

console.log("Usuario en Navbar.vue:", user.value);

watch(
  () => user.value,
  (newUser) => {
    if (newUser && newUser.email) {
      email.value = newUser.email.toUpperCase().charAt(0); // Primera letra del email
    } else {
      email.value = "AI"; // Valor predeterminado si no hay usuario
    }
  },
  { immediate: true }
);

// Cerrar sesión
const handleLogout = async () => {
  try {
    await authStore.logout();
    alert("Logout successful");
    router.push("/");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/projects"
            :class="user ? 'text-black' : 'text-gray-400 cursor-not-allowed pointer-events-none'">
            Projects
          </RouterLink>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink class="btn btn-ghost text-xl hover-logo" to="/">RobKanban.js</RouterLink>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar flex justify-center items-center">
          <div class="">
            <div class="avatar avatar-online avatar-placeholder">
              <div class="bg-neutral text-neutral-content w-8 rounded-full">
                <span class="text-xs">{{ email }}</span>
              </div>
            </div>
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li v-if="user"><button @click="handleLogout">Logout</button></li>
          <li v-if="!user"><RouterLink to="/auth">Login</RouterLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-logo{
  border-radius: 32px;
  border: none;
}
.hover-logo:hover{
  background: rgb(242, 241, 241);
}
</style>