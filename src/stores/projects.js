import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getAllProjects, createProject } from '@/api/supabase/projectsApi.js'
import { supabase } from '@/api/supabase'

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
            const user = supabase.auth.user();
            if (!user) {
                throw new Error("User not authenticated");
            }
            const {data, error} = await createProject(
                title,
                description,
                priority,
                status,
                deadline,
                user.id
            );
            if (error) {
                throw new Error(error.message);
            }
            // Agrego el nuevo proyecto al array de proyectos
            projects.push(...data);

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