<script setup>
import { CodeBracketIcon, CircleStackIcon, HandRaisedIcon } from "@heroicons/vue/24/outline";
</script>

<template>
        <section class="py-10 md:py-16">

<div class="container max-w-screen-xl mx-auto px-4">

    <h2 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Lo que aprendí</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <CodeBracketIcon class="size-6" />
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">Gestión de estado</h4>

            <p class="font-normal text-gray-500 text-md">Aprendí a sincronizar el estado local (arrastrar/soltar tareas) con el backend en tiempo real</p>
        </div>
        
        <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <CircleStackIcon class="size-6" />
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">Integración con Supabase</h4>

            <p class="font-normal text-gray-500 text-md">Configurar Supabase para manejar operaciones básicas (crear, leer, actualizar y borrar tareas)</p>
        </div>

        <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
                <HandRaisedIcon class="size-6" />
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">Drag & drop</h4>

            <p class="font-normal text-gray-500 text-md">Uso de librerías como Vue FormKit o la API nativa HTML5 Drag and Drop, y luego guardar el nuevo orden en Supabase</p>
        </div>




    </div>

</div>

</section>
</template>