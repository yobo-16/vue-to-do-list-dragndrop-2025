<script setup>
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

import { ref } from 'vue';

const emit = defineEmits(['submit-project']);

const title = ref('');
const description = ref('');
const priority = ref('');
const status = ref('');
const deadline = ref('');

const _handleSubmit = async () => {
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


<!-- <template>
    <form @submit.prevent="_handleSubmit">
        <label for="title">Task title</label>
        <input type="text" id="title" v-model="title" required/>

        <hr>

        <label for="description">Description</label>
        <textarea name="Description" type="text" id="description" v-model="description" required></textarea>

        <hr>

        <label for="priority">Priority</label>
        <input type="text" id="priority" v-model="priority" required/>

        <hr>

        <label for="status">Status</label>
        <input type="text" id="status" v-model="status" required/>

        <hr>

        <label for="deadline">Deadline</label>
        <input type="date" id="deadline" v-model="deadline" required/>

        <hr>

        <button class="btn btn-secondary m-4" type="submit">Add Project</button>


    </form>
</template> -->


<template>
    <form @submit.prevent="_handleSubmit" class="mt-8 w-xl bg-amber-200">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div class="col-span-full">
                        <label for="title" class="block text-sm/6 font-medium text-gray-900">Task title</label>
                        <div class="mt-2">
                            <input type="text" v-model="title" name="title" id="title" autocomplete="given-name"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>


                    <div class="col-span-full">
                        <label for="description" class="block text-sm/6 font-medium text-gray-900">Description</label>
                        <div class="mt-2">
                            <textarea v-model="description" name="description" id="description" rows="3"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="priority" class="block text-sm/6 font-medium text-gray-900">Priority</label>
                        <div class="mt-2">
                            <select id="priority" name="priority" autocomplete="priority" v-model="priority"
                                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="status" class="block text-sm/6 font-medium text-gray-900">Status</label>
                        <div class="mt-2">
                            <select id="status" name="priority" autocomplete="status" v-model="status"
                                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option>{{ "Backlog" }}</option>
                                <option>{{ "To do" }}</option>
                                <option>{{ "Doing" }}</option>
                                <option>{{ "Done" }}</option>
                            </select>
                        </div>
                    </div>

                              <!-- Deadline -->
                    <div class="col-span-full">
                        <label for="deadline" class="block text-sm font-medium text-gray-900">Deadline</label>
                        <div class="mt-2">
                        <input
                            type="date"
                            id="deadline"
                            v-model="deadline"
                            required
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                        />
                        </div>
                    </div>


                </div>



            </div>


        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>




<style scoped></style>