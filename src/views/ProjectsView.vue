<script setup>
import { onMounted, ref, computed } from "vue";

// Componentes
import {
  AddProjectForm,
  EditProjectForm,
  DeleteProjectModal,
  DashboardBar,
  TaskColumn,
} from "@/components";

import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const projectToEdit = ref(null);
const projectToDelete = ref(null);

const searchQuery = ref(""); // Texto del buscador
const selectedPriority = ref(""); // Prioridad seleccionada
const selectedStatus = ref("All Columns"); // Estado 

onMounted(() => {
  if (projectsStore.projects.length === 0) {
    projectsStore.fetchProjects();
  }
});

// Filtros
const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    const matchesSearch =
      searchQuery.value === "" ||
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesPriority =
      selectedPriority.value === "" || project.priority === selectedPriority.value;
    return matchesSearch && matchesPriority;
  });
});

// columnas a mostrar
const visibleStatuses = computed(() => {
  if (selectedStatus.value === "All Columns") {
    return ["Backlog", "To do", "Doing", "Done"];
  }
  return [selectedStatus.value];
});

// cambio de columna
const handleMoveBetweenColumns = async ({ project, newStatus }) => {
  if (project.status !== newStatus) {
    try {
      console.log(`Moviendo proyecto ${project.id} a la columna ${newStatus}`);
      await projectsStore.updateProject(project.id, { status: newStatus });
    } catch (error) {
      console.error("Error actualizando el estado del proyecto:", error);
    }
  }
};


const handleReorderProjects = ({ status, items }) => {
  console.log(`Proyectos reordenados en la columna ${status}:`, items.map((i) => i.id));
};

// Función para abrir el modal de edición
const openEditModal = (project) => {
  projectToEdit.value = project;
  isEditModalOpen.value = true;
};

// Función para manejar la edición de un proyecto
const handleEditProject = async (updatedData) => {
  try {
    await projectsStore.updateProject(projectToEdit.value.id, updatedData);
    isEditModalOpen.value = false;
  } catch (error) {
    console.error("Error actualizando el proyecto:", error);
  }
};

// modal de eliminación
const openDeleteModal = (project) => {
  projectToDelete.value = project;
  isDeleteModalOpen.value = true;
};

// eliminación de un proyecto
const handleDeleteProject = async (projectId) => {
  try {
    await projectsStore.deleteProject(projectId);
    isDeleteModalOpen.value = false;
  } catch (error) {
    console.error("Error eliminando el proyecto:", error);
  }
};

// adición de un proyecto
const handleAddProject = async (projectData) => {
  try {
    await projectsStore.addProject(
      projectData.title,
      projectData.description,
      projectData.priority,
      projectData.status,
      projectData.deadline
    );
    isModalOpen.value = false;
  } catch (error) {
    console.error("Error agregando el proyecto:", error);
  }
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Barra del dashboard -->
    <DashboardBar
      @filter-search="searchQuery = $event"
      @filter-priority="selectedPriority = $event"
      @filter-status="selectedStatus = $event"
    >
      <template #add-project>
        <button
          @click="isModalOpen = true"
          class="btn-add-project btn-outline-white rounded-md px-4 py-2 text-sm font-semibold text-white "
        >
          Add Project
        </button>
      </template>
    </DashboardBar>

    <!-- Contenido principal -->
    <div class="max-w-[90%] mx-auto my-4">
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TaskColumn
          v-for="status in visibleStatuses"
          :key="status"
          :title="status"
          :projects="filteredProjects.filter((p) => p.status === status)"
          @edit-project="openEditModal"
          @delete-project="openDeleteModal"
          @reorder-projects="handleReorderProjects"
          @move-between-columns="handleMoveBetweenColumns"
        />
      </section>

      <AddProjectForm
        v-if="isModalOpen"
        @submit-project="handleAddProject"
        @close-modal="isModalOpen = false"
      />
      <EditProjectForm
        v-if="isEditModalOpen"
        :project="projectToEdit"
        @submit-edit="handleEditProject"
        @close-modal="isEditModalOpen = false"
      />
      <DeleteProjectModal
        v-if="isDeleteModalOpen"
        :project="projectToDelete"
        @confirm-delete="handleDeleteProject"
        @close-modal="isDeleteModalOpen = false"
      />
    </div>
  </div>
</template>

<style scoped>
  .btn-outline-white {
  border: 2px solid white !important;
  background: none;
  color: white;
  border-radius: 9999px !important;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}

.btn-outline-white:hover {
  background-color: white;
  color: black;
}
</style>