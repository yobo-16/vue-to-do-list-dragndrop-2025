<script setup>
</script>

<template>
  <nav class="bg-gray-800 text-white shadow-md top-16 left-0 w-full z-10">
    <div class="flex items-center justify-between px-4 py-2">
      <slot name="add-project"></slot>

      <!-- Buscador -->
      <div class="flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          class="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button class="ml-2 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 transition">
          Buscar
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>