import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/ejemplos',
      name: 'ejemplos',
      component: () => import('../components/Ejemplos.vue'),

    },
  ],
});

router.beforeEach(async(to, from, next)=>{
  try {
    const authStore = useAuthStore();
    await authStore.fetchUser();
    // Verifica el que el usuario esta autenticado authStore.user --> Puedes usar la variable isAuthenticated en auth.js pero debes modificar su comportamiento
    if(to.meta.requiresAuth && !authStore.user ) {
      next("/");

    } else{
      next();
    }
  } catch (error) {
    console.error(error);
  }
})

export default router
