<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true, // El proyecto a eliminar es obligatorio
  },
});

const emit = defineEmits(["confirm-delete", "close-modal"]);

const confirmDelete = () => {
  emit("confirm-delete", props.project.id); // Emitir el ID del proyecto a eliminar
};

const closeModal = () => {
  emit("close-modal"); // Cerrar el modal
};
</script>

<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-[90%] sm:max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 class="text-lg font-semibold text-gray-900">Eliminar Proyecto</h2>
        <p class="mt-4 text-gray-700">
          ¿Estás seguro de que deseas eliminar el proyecto <strong>{{ project.title }}</strong>?
        </p>
        <p class="mt-2 text-gray-500">{{ project.description }}</p>
        <div class="mt-6 flex justify-end gap-x-4">
          <button
            @click="closeModal"
            class="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
  button{
    border-radius: 32px;
  }
  </style>