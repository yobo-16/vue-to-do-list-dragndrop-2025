<script setup>
import { onMounted, ref } from "vue";
import AddProjectForm from "@/components/AddProjectForm.vue";
import EditProjectForm from "@/components/EditProjectForm.vue";
import DeleteProjectModal from "@/components/DeleteProjectModal.vue";
import TaskColumn from "@/components/TaskColumn.vue";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);

const isModalOpen = ref(false); // Controla la visibilidad del modal de agregar proyectos
const isEditModalOpen = ref(false); // Controla la visibilidad del modal de edición
const isDeleteModalOpen = ref(false); // Controla la visibilidad del modal de eliminación
const projectToEdit = ref(null); // Almacena el proyecto seleccionado para editar
const projectToDelete = ref(null); // Almacena el proyecto seleccionado para eliminar

onMounted(() => {
  projectsStore.fetchProjects();
});

// Maneja la apertura del modal de edición
const openEditModal = (project) => {
  projectToEdit.value = project; // Asigna el proyecto seleccionado
  isEditModalOpen.value = true; // Abre el modal
};

// Maneja la apertura del modal de eliminación
const openDeleteModal = (project) => {
  projectToDelete.value = project; // Asigna el proyecto seleccionado
  isDeleteModalOpen.value = true; // Abre el modal
};

// confirmación de eliminación
const handleDeleteProject = async (projectId) => {
  try {
    console.log("Eliminando proyecto con ID:", projectId); // Depuración
    await projectsStore.deleteProject(projectId); // Llama a la función de eliminación en la store
    isDeleteModalOpen.value = false; // Cierra el modal después de eliminar
    projectToDelete.value = null; // Limpia el proyecto seleccionado
  } catch (error) {
    console.error("Error eliminando proyecto:", error);
  }
};

// Maneja el envío del formulario de edición
const handleEditProject = async (updatedProjectData) => {
  try {
    console.log("handleEditProject llamado con:", updatedProjectData); // Depuración
    await projectsStore.updateProject(projectToEdit.value.id, updatedProjectData);
    console.log("Proyecto editado exitosamente:", projectToEdit.value.id); // Depuración
    isEditModalOpen.value = false; // Cierra el modal después de editar
    projectToEdit.value = null; // Limpia el proyecto seleccionado
  } catch (error) {
    console.error("Error editando proyecto:", error);
  }
};

//  formulario de agregar proyecto
const handleAddProject = async (projectData) => {
  try {
    console.log("handleAddProject llamado con:", projectData); // Depuración
    await projectsStore.addProject(
      projectData.title,
      projectData.description,
      projectData.priority,
      projectData.status,
      projectData.deadline
    );
    isModalOpen.value = false; // Cierra el modal después de agregar
  } catch (error) {
    console.error("Error agregando proyecto:", error);
  }
};
</script>

<template>
  <div>
    <h1>PROJECTS VIEW</h1>

    <!-- Botón para agregar un proyecto -->
    <button
      @click="isModalOpen = true"
      class="mb-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600"
    >
      Add Project
    </button>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Renderizar columnas -->
      <TaskColumn
        title="Backlog"
        :projects="projects.filter(project => project.status === 'Backlog')"
        @edit-project="openEditModal"
        @delete-project="openDeleteModal"
      />
      <TaskColumn
        title="To do"
        :projects="projects.filter(project => project.status === 'To do')"
        @edit-project="openEditModal"
        @delete-project="openDeleteModal"
      />
      <TaskColumn
        title="Doing"
        :projects="projects.filter(project => project.status === 'Doing')"
        @edit-project="openEditModal"
        @delete-project="openDeleteModal"
      />
      <TaskColumn
        title="Done"
        :projects="projects.filter(project => project.status === 'Done')"
        @edit-project="openEditModal"
        @delete-project="openDeleteModal"
      />
    </section>

    <!-- Modal para agregar proyecto -->
    <AddProjectForm
      v-if="isModalOpen"
      @submit-project="handleAddProject"
      @close-modal="isModalOpen = false"
    />

    <!-- Modal para editar proyecto -->
    <EditProjectForm
      v-if="isEditModalOpen"
      :project="projectToEdit"
      @submit-edit="handleEditProject"
      @close-modal="isEditModalOpen = false"
    />

    <!-- Modal para eliminar proyecto -->
    <DeleteProjectModal
      v-if="isDeleteModalOpen"
      :project="projectToDelete"
      @confirm-delete="handleDeleteProject"
      @close-modal="isDeleteModalOpen = false"
    />
  </div>
</template>

<style scoped></style>