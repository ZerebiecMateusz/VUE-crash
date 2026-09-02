<script setup>
import Card from './Card.vue';
import { defineProps } from 'vue';
defineProps({
  titleCard1: {
    type: String,
    required: true,
    default: 'For Developers',
  },
  descriptionCard1: {
    type: String,
    required: true,
    default: 'Browse our vue jobs and start your career today'
  },
  titleCard2: {
    type: String,
    required: true,
    default: 'For Employers',
  },
  descriptionCard2: {
    type: String,
    required: true,
    default: 'List your job to find the best vue developers for your company'
  }
});
</script>
<template>
    <section class="py-4">
        <Card>
            <h2 class="text-xl font-bold mb-2">{{ titleCard1 }}</h2>
            <p class="text-gray-600">{{ descriptionCard1 }}</p>
            <a href="jobs.html" class="inline-block bg-blue-500 text-white rounded-lg px-4 my-4 py-2 hover:bg-green-600">Browse Jobs</a>
        </Card>
        <Card bg="bg-green-100">
           <h2 class="text-xl font-bold mb-2">{{ titleCard2 }}</h2>
            <p class="text-gray-600">{{ descriptionCard2 }}</p>
            <a href="jobs.html" class="inline-block bg-green-500 text-white rounded-lg my-4 px-4 py-2 hover:bg-green-600">Browse Jobs</a>
        </Card>
    </section>
</template>