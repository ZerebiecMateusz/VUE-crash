<script setup>
import { defineProps } from 'vue';
defineProps({
  title: {
    type: String,
    required: true,
    default: 'Become a Vue Dev',
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Find your dream job with Vue.js that fits your skill and needs',
  },
})
</script>

<template>
  <section class="bg-green-700 py-16">
    <div class="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-5xl font-extrabold text-white mb-4">{{title}}</h1>
        <p class="text-lg text-white mb-8">{{ subtitle }}</p>
        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </div>
  </section>
</template>