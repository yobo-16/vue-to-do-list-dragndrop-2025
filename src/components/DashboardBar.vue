<script setup>
import { defineEmits } from "vue";
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(["filter-search", "filter-priority", "filter-status"]); // Emitir el texto del buscador, la prioridad y el status seleccionado
</script>

<template>
  <nav class="bg-gray-800 text-white shadow-md top-16 left-0 w-full z-10">
    <div class="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-4">
      <!-- Botón Add Project -->
      <slot name="add-project">
        <button
          class="px-4 py-2 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition w-full sm:w-auto"
        >
          Add Project
        </button>
      </slot>

      <!-- Filtros -->
      <div class="filter-container flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div class="flex">
          <AdjustmentsHorizontalIcon class="size-5 text-gray-300 me-1"/>
          <p class="text-sm text-gray-300"> Filters:</p>
        </div>
        

        <!-- Filtro por prioridad -->
        <select
          @change="emit('filter-priority', $event.target.value)"
          class="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <!-- Filtro por columnas -->
        <select
          @change="emit('filter-status', $event.target.value)"
          class="filter-column px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        >
          <option value="All Columns">All Columns</option>
          <option value="Backlog">Backlog</option>
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>

        <!-- Buscador -->
        <input
          type="text"
          placeholder="Buscar..."
          @input="emit('filter-search', $event.target.value)"
          class="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>

slot[name="add-project"] {
  width: 100%;
}

@media (min-width: 640px) {
  slot[name="add-project"] {
    width: auto;
  }
  .filter-column{
    display: none;
  }
}

@media (max-width: 639px) {
  .flex-col {
    flex-direction: column;
  }

  .items-start {
    align-items: flex-start;
  }

  .filter-container {
    margin-bottom: 1rem;
  }
}


@media (min-width: 640px) {
  .flex-row {
    flex-direction: row;
  }

  .items-center {
    align-items: center;
  }

  .filter-column{
    display: auto;
  }
}
</style>