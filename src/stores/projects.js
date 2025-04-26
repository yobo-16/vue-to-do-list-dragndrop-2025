import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import {getAllProjects, createProject} from '@/api/supabase/projectsApi.js'

export const useProjectsStore = defineStore('projects', () => {
    const projects = reactive([])

    // Getters

    // Actions

    // Fetch
     async function fetchProjects(){
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
            const data = await createProject(title, description, priority, status, deadline);
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