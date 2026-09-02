<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="text-center flex flex-col justify-center items-center h-96">
        <i class="pi pi-exclamation-triangle text-6xl text-red-600 mb-4"></i>
        <h1 class="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p class="text-gray-600 mb-4">The page you are looking for does not exist.</p>
        <RouterLink to="/" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Go Back Home            
        </RouterLink>
    </section>
</template>