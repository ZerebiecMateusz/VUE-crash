<script setup>
import { onMounted, watch, nextTick } from 'vue';
import { useToast } from 'vue-toastification';
import JobsListings from '../components/JobsListings.vue'; 

const toast = useToast();

onMounted(() => {
  const message = localStorage.getItem('toastMessage');
  
  if (message) {
    localStorage.removeItem('toastMessage');
    toast.success(message);
  }
});
</script>

<template>
  <JobsListings />
</template>