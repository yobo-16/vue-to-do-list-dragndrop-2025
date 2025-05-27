import { reactive } from "vue";
import { defineStore } from "pinia";
import { getAllProjects, createProject } from "@/api/supabase/projectsApi.js";
import { supabase } from "@/api/supabase/index.js"; 
import { useAuthStore } from "@/stores/auth";

export const useProjectsStore = defineStore("projects", () => {
  const projects = reactive([]);

  // Fetch projects
  async function fetchProjects() {
    try {
      const data = await getAllProjects();
      projects.push(...data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Add project
  async function addProject(title, description, priority, status, deadline) {
    try {
      const authStore = useAuthStore();
      const user = authStore.user;
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("Datos enviados a Supabase desde addProject:", {
        title,
        description,
        priority,
        status,
        deadline,
        user_id: user.id,
      });

      const projectsCreated = await createProject(
        title,
        description,
        priority,
        status,
        deadline,
        user.id
      );

      projects.push(...projectsCreated);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  }

  // Update project
  async function updateProject(id, updatedData) {
    try {
      console.log("Actualizando proyecto con ID:", id);
      console.log("Datos actualizados:", updatedData);
  
      const { data, error } = await supabase
        .from('Projects') // Usa comillas dobles para nombres con mayúsculas
        .update(updatedData)
        .eq("id", id)
        .select();
  
      if (error) {
        console.error("Error al actualizar proyecto en Supabase:", error.message);
        throw error;
      }
  
      console.log("Proyecto actualizado en Supabase:", data);
  
      const index = projects.findIndex((project) => project.id === id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...updatedData };
      }
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  }

  return {
    projects,
    fetchProjects,
    addProject,
    updateProject,
  };
});