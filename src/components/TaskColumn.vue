<script setup>
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    title: String,
    projects: Array
})

const emit = defineEmits([
    'edit-project',
    'delete-project',
    'reorder-projects',
    'move-between-columns'
])

const localProjects = ref([...props.projects])

watch(() => props.projects, (newVal) => {
    localProjects.value = [...newVal]

}, { deep: true })

const [container, items] = useDragAndDrop(localProjects, {
    group: 'project-columns',
    dropZone: 'container'
})

watch(items, async (updated, prev) => {
    for (const project of updated) {
        if (project.status !== props.title) {
            emit('move-between-columns', {
                project,
                newStatus: props.title
            })
        }
    }

    emit('reorder-projects', { status: props.title, items: updated })
})

const getBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
        case "high": return "badge badge-error text-white"
        case "medium": return "badge badge-warning"
        case "low": return "badge badge-success"
        default: return "badge badge-secondary"
    }
}

const isOver = ref(false)
</script>

<template>
    <div class="task-column bg-gray-100 p-4 rounded-lg shadow-md"
        :class="{ 'bg-indigo-100 border-indigo-400 border-2': isOver }" @dragenter.prevent="isOver = true"
        @dragleave.prevent="isOver = false" @drop.prevent="isOver = false">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h2>
        <div ref="container" class="min-h-[80px] flex flex-col gap-2">
            <div v-for="project in items" :key="project.id" class="draggable-item bg-white p-3 rounded-md shadow-sm ">
                <div class="flex items-center justify-between bg-gray-500">
                    <h3 class="text-md font-semibold text-gray-800">{{ project.title }}</h3>
                    <span :class="getBadgeClass(project.priority)">
                        {{ project.priority }}
                    </span>
                </div>
                <p class="text-sm text-gray-600">{{ project.description }}</p>
                <p class="text-sm text-gray-400">{{ project.deadline }}</p>
                <div class="mt-2 flex gap-x-2">
                    <button @click="emit('edit-project', project)"
                        class="rounded bg-yellow-500 px-2 py-1 text-sm text-white flex">
                        <PencilIcon  class="size-4 me-1"/> Edit

                    </button>
                    <button @click="emit('delete-project', project)"
                        class="rounded bg-red-600 px-2 py-1 text-sm text-white flex">
                        <TrashIcon  class="size-5 me-1"/> Delete
                         
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.task-column {
    min-height: 300px;
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.draggable-item {
    cursor: grab;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 1 !important;
}

.draggable-item:active {
    cursor: grabbing;
}
</style>
