import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProjects, createProject } from '@/api/supabase/projectsApi.js'
import { supabase } from '@/api/supabase'
import { useAuthStore } from "@/stores/auth";


export const useProjectsStore = defineStore('projects', () => {
    const projects = reactive([])

    // Getters

    // Actions

    // Fetch
    async function fetchProjects() {
        try {
            const data = await getAllProjects();
            projects.push(...data);

        } catch (error) {
            console.error(error);
        }
    }

    // Add project
    async function addProject(title, description, priority, status, deadline) {
        try {
            // Obtengoo el user autenticado
            // const user = supabase.auth.getUser();
            //  const {data: {user}, error} = await supabase.auth.getUser();
            const authStore = useAuthStore();
            const user = authStore.user;
            if (!user) {
                throw new Error("User not authenticated");
            }
            // const {data, error: insertError} = await createProject(
            const projectsCreated = await createProject(
                title,
                description,
                priority,
                status,
                deadline,
                user.id
            );
            // Agrego el nuevo proyecto al array de proyectos
            projects.push(...projectsCreated);

        } catch (error) {
            console.error(error);
        }
    }


    return {
        // Estado
        projects,
        // Getters
        // Actions
        fetchProjects,
        addProject
    }
})