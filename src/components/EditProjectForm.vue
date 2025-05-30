<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["submit-edit", "close-modal"]);

const props = defineProps({
  project: {
    type: Object,
    required: true, // El proyecto a editar es obligatorio
  },
});

const title = ref("");
const description = ref("");
const priority = ref("");
const status = ref("");
const deadline = ref("");

// Actualiza los campos del formulario cuando cambie el proyecto
watch(
  () => props.project,
  (newProject) => {
    if (newProject) {
      title.value = newProject.title || "";
      description.value = newProject.description || "";
      priority.value = newProject.priority || "";
      status.value = newProject.status || "";
      deadline.value = newProject.deadline || "";
    }
  },
  { immediate: true }
);

// Función para cerrar el modal
const closeModal = () => {
  emit("close-modal"); // Notifica al componente padre que el modal se cerró
};

// Función para manejar el envío del formulario
const _handleSubmit = async () => {
  const updatedData = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    status: status.value,
    deadline: deadline.value,
  };

  console.log("Datos del formulario de edición enviados:", updatedData);

  // Emitir el evento con los datos actualizados
  emit("submit-edit", updatedData);
  console.log("Datos emitidos desde el modal de edición:", updatedData);

  // Cerrar el modal
  closeModal();
};
</script>

<template>
  <!-- Modal -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-full max-w-[90%] sm:max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <h2 class="text-lg font-semibold text-gray-900">Editar Proyecto</h2>
      <form @submit.prevent="_handleSubmit" class="mt-4 space-y-6">
        <!-- Task Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-900">Task Title</label>
          <input
            type="text"
            v-model="title"
            id="title"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-900">Description</label>
          <textarea
            v-model="description"
            id="description"
            rows="3"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          ></textarea>
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-900">Priority</label>
          <select
            v-model="priority"
            id="priority"
            class="block w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label for="status" class="block text-sm font-medium text-gray-900">Status</label>
          <select
            v-model="status"
            id="status"
            class="block w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          >
            <option>Backlog</option>
            <option>To do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>

        <!-- Deadline -->
        <div>
          <label for="deadline" class="block text-sm font-medium text-gray-900">Deadline</label>
          <input
            type="date"
            v-model="deadline"
            id="deadline"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
          />
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-end gap-x-4">
          <button
            type="button"
            @click="closeModal"
            class="text-sm font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>