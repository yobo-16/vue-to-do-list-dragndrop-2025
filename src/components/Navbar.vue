
<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router'

const email = ref("AI");

const authStore = useAuthStore();
const { user } = storeToRefs(authStore); 

console.log("Usuario en Navbar.vue:", user.value);

email.value = user.value !== null ? user.value.email.toUpperCase().charAt(0) : "AI";
console.log(email);



// Cerrar session

const handleLogout = async () =>{
    try {

        await authStore.logout();
        console.log("Logout successful");
    } catch (error) {
        console.error("Error during logout:", error);
        
    } 
}

</script>
<template>
    <nav class="navbar bg-base-300 shadow-sm">
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink> -->
        <div className="navbar-start">
          <div class="dropdown">
            <div tabIndex={0} role="button" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul tabIndex={0} class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/about">About</RouterLink>
              <RouterLink to="/projects">Projects</RouterLink>

            </ul>
          </div>
        </div>

        <div class="navbar-end">
          <div class="dropdown dropdown-end bg-secondary">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar bg-blue-900 flex justify-center items-center">
              <div class="">
                <!-- <img alt=""
                  src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" /> -->
                  <div class="avatar avatar-online avatar-placeholder">
                  <div class="bg-neutral text-neutral-content w-8 rounded-full">
                    <span class="text-xs">{{email}}</span>
                  </div>
                </div>
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><button @click="handleLogout">Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <RouterView /> -->
</template>




<style  scoped>

</style>