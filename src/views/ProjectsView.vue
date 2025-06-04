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

const searchQuery = ref(""); //buscador
const selectedPriority = ref(""); // Prioridad
const selectedStatus = ref("All Columns"); // Columnas

onMounted(() => {
  if (projectsStore.projects.length === 0) {
    projectsStore.fetchProjects();
  }
});

// Computed para filtrar proyectos por título y prioridad
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

// Computed para las columnas 
const visibleStatuses = computed(() => {
  if (selectedStatus.value === "All Columns") {
    return ["Backlog", "To do", "Doing", "Done"];
  }
  return [selectedStatus.value];
});
</script>

<template>
  <div>
    <!-- Barra del dashboard -->
    <DashboardBar
      @filter-search="searchQuery = $event"
      @filter-priority="selectedPriority = $event"
      @filter-status="selectedStatus = $event"
    >
      <template #add-project>
        <button
          @click="isModalOpen = true"
          class="btn-add-project rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
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
.btn-add-project[data-v-076d98d6]{
    
    @media screen and (max-width: 640px) {
        background: red !important;
        width: 100%;
    }    
}
</style>

<!-- Test -->