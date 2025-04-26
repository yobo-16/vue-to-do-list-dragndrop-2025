<script setup>
import { onMounted } from 'vue';
import AddProjectForm from '@/components/AddProjectForm.vue';
import { useProjectsStore } from '@/stores/projects';
import { storeToRefs } from 'pinia';

const projectsStore = useProjectsStore();
const { projects } = storeToRefs(projectsStore);


onMounted(()=>{
    projectsStore.fetchProjects();
})

const handleAddProject = async (projectData) => {
    try {
        await projectsStore.addProject(
            projectData.title,
            projectData.description,
            projectData.priority,
            projectData.status,
            projectData.deadline
        );

        console.log(projectData);
        console.log(projectsStore.projects);
    } catch (error) {
        console.error('Error adding project:', error);
    }
}; 
</script>

<template>
    <div>
        <h1>PROJECTS VIEW</h1>
        <AddProjectForm @submit-project="handleAddProject"/>  

        <section>
            <h2>Projects</h2>
            <div>
                <ul>
                    <li v-for="project in projects" :key="project.id">{{ project.title }}</li>
                </ul>
            </div>
        </section>
    </div>
    
</template>

<style scoped>

</style>