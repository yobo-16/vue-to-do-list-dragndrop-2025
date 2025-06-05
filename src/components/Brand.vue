<script setup>

</script>

<template>
    <section class="py-10 md:py-16">

        <div class="container max-w-screen-xl mx-auto px-4">

            <h2 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Stack</h2>

            <p class="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">Principales herramientas utilizadas</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <img class="m-auto"
                    src="../img/brands/supabase.png"
                    alt="Image">
                
                <img class="m-auto"
                    src="../img/brands/vue-logo.png"
                    alt="Image">
                
                <img class="m-auto"
                    src="../img/brands/formkit.png"
                    alt="Image">

                <img class="m-auto"
                    src="../img/brands/daisy.png"
                    alt="Image">

                <img class="m-auto"
                    src="../img/brands/heroicons.png"
                    alt="Image">

                <img class="m-auto"
                    src="../img/brands/pinia.png"
                    alt="Image">
                


            </div>
        </div>

    </section>
</template>



<style scoped>
img{
    transition: transform 0.5s ease;
    filter: grayscale();
}

img:hover {
    transform: scale(1.1);
    filter: none;
}

</style>