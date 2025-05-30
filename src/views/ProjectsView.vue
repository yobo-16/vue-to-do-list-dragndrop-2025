<script setup>
import { onMounted, ref } from "vue"
import AddProjectForm from "@/components/AddProjectForm.vue"
import EditProjectForm from "@/components/EditProjectForm.vue"
import DeleteProjectModal from "@/components/DeleteProjectModal.vue"
import TaskColumn from "@/components/TaskColumn.vue"
import { useProjectsStore } from "@/stores/projects"
import { storeToRefs } from "pinia"

const projectsStore = useProjectsStore()
const { projects } = storeToRefs(projectsStore)

const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const projectToEdit = ref(null)
const projectToDelete = ref(null)

onMounted(() => {
    projectsStore.fetchProjects()
})

const openEditModal = (project) => {
    projectToEdit.value = project
    isEditModalOpen.value = true
}

const handleEditProject = async (updatedData) => {
    try {
        await projectsStore.updateProject(projectToEdit.value.id, updatedData)
        isEditModalOpen.value = false
    } catch (error) {
        console.error("Error actualizando proyecto:", error)
    }
}

const openDeleteModal = (project) => {
    projectToDelete.value = project
    isDeleteModalOpen.value = true
}

const handleDeleteProject = async (projectId) => {
    try {
        await projectsStore.deleteProject(projectId)
        isDeleteModalOpen.value = false
    } catch (error) {
        console.error("Error eliminando proyecto:", error)
    }
}

const handleMoveBetweenColumns = async ({ project, newStatus }) => {
    if (project.status !== newStatus) {
        console.log('Moviendo proyecto:', project.id, '→', newStatus) // 👈
        try {
            await projectsStore.updateProject(project.id, { status: newStatus })
        } catch (error) {
            console.error("Error actualizando status en Supabase:", error)
        }
    }
}

const handleReorderProjects = ({ status, items }) => {
    console.log(`Reorden en columna ${status}:`, items.map(i => i.id))
}

const handleAddProject = async (projectData) => {
    try {
        await projectsStore.addProject(
            projectData.title,
            projectData.description,
            projectData.priority,
            projectData.status,
            projectData.deadline
        )
        isModalOpen.value = false
    } catch (error) {
        console.error("Error agregando proyecto:", error)
    }
}
</script>

<template>
    <div class="max-w-[90%] mx-auto">
        <h1>PROJECTS VIEW</h1>
        <button @click="isModalOpen = true"
            class="mb-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Add Project
        </button>

        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TaskColumn v-for="status in ['Backlog', 'To do', 'Doing', 'Done']" :key="status" :title="status"
                :projects="projects.filter(p => p.status === status)" @edit-project="openEditModal"
                @delete-project="openDeleteModal" @reorder-projects="handleReorderProjects"
                @move-between-columns="handleMoveBetweenColumns" />
        </section>

        <AddProjectForm v-if="isModalOpen" @submit-project="handleAddProject" @close-modal="isModalOpen = false" />
        <EditProjectForm v-if="isEditModalOpen" :project="projectToEdit" @submit-edit="handleEditProject"
            @close-modal="isEditModalOpen = false" />
        <DeleteProjectModal v-if="isDeleteModalOpen" :project="projectToDelete" @confirm-delete="handleDeleteProject"
            @close-modal="isDeleteModalOpen = false" />
    </div>
</template>
