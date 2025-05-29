<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true, 
  },
  projects: {
    type: Array,
    // Lista de proyectos
    required: true, 
  },
});
</script>

<template>
  <div class="task-column bg-gray-100 p-4 rounded-lg shadow-md">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h2>
    <ul>
      <li
        v-for="project in projects"
        :key="project.id"
        class="bg-white p-3 rounded-md shadow-sm mb-2"
      >
        <h3 class="text-md font-semibold text-gray-800">{{ project.title }}</h3>
        <p class="text-sm text-gray-600">{{ project.description }}</p>
        <div class="mt-2 flex gap-x-2">
          <!-- Botón para editar -->
          <button
            @click="$emit('edit-project', project)"
            class="rounded bg-yellow-500 px-2 py-1 text-sm text-white"
          >
            Edit
          </button>
          <!-- Botón para eliminar -->
          <button
            @click="$emit('delete-project', project)"
            class="rounded bg-red-600 px-2 py-1 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.task-column {
  min-height: 300px;
}
</style>