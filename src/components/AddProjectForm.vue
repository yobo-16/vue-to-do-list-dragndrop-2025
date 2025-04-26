<script setup>

import { ref } from 'vue';

const emit = defineEmits(['submit-project']);

const title = ref('');
const description = ref('');
const priority = ref('');
const status = ref('');
const deadline = ref('');

const _handleSubmit =  async() =>{
        const data = {
        title: title.value,
        description: description.value,
        priority: priority.value,
        status: status.value,
        deadline: deadline.value
    }

    // Se emite el evento con los dato del formulario
    emit('submit-project', data);
        
    title.value = '';
    description.value = '';
    priority.value = '';
    status.value = '';
    deadline.value = '';

}
</script>


<template>
    <form @submit.prevent="_handleSubmit">
        <label for="title">Task title</label>
        <input type="text" id="title" v-model="title" />

        <hr>

        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" />

        <hr>

        <label for="priority">Priority</label>
        <input type="text" id="priority" v-model="priority" />

        <hr>

        <label for="status">Status</label>
        <input type="text" id="status" v-model="status" />

        <hr>

        <label for="deadline">Deadline</label>
        <input type="date" id="deadline" v-model="deadline" />

        <hr>

        <button type="submit">Add Project</button>


    </form>
</template>



<style scoped>

</style>