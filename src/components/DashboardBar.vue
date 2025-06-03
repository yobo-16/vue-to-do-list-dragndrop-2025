<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["filter-search", "filter-priority"]); // Emitir el texto del buscador y la prioridad seleccionada
</script>

<template>
  <nav class="bg-gray-800 text-white shadow-md top-16 left-0 w-full z-10">
    <div class="flex items-center justify-between px-4 py-2">
      <slot name="add-project"></slot>

      <!-- Filtros -->
      <div class="flex items-center gap-4">

                <!-- Filtro por prioridad -->
        <select
          @change="emit('filter-priority', $event.target.value)"
          class="px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <!-- Buscador -->
        <input
          type="text"
          placeholder="Buscar..."
          @input="emit('filter-search', $event.target.value)"
          class="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />


      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>