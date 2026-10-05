 <script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import axios from 'axios';
import BackButton from '../components/BackButton.vue';

const route = useRoute();
const jobId = route.params.id;

const state = reactive({
    jobs: {},
    isLoading: true,
    showFullDescription: false
});

const toggleDescription = () => {
  state.showFullDescription = !state.showFullDescription;
};

const getTruncatedDescription = (description) => {
  if (!description) return '';
  if (!state.showFullDescription && description.length > 90) {
    return description.substring(0, 90) + '...';
  }
  return description;
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    state.job = response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
  } finally {
    state.isLoading = false;
  }
});

</script>

<template>
  <BackButton />
  <section v-if="!state.isLoading" class="bg-blue-50 px-4 py-10 m-6 rounded-lg shadow-md">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Job Details
      </h2>

      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2>{{ state.job.type }}</h2>
        <h1 class="font-bold text-xl text-gray-800 mb-3">{{ state.job.title }}</h1>
        
        <!-- Wyświetlanie opisu -->
        <p>{{ getTruncatedDescription(state.job.description) }}</p>
        
        <button 
          v-if="state.job.description && state.job.description.length > 20" 
          @click="toggleDescription" 
          class="text-green-500 hover:text-green-600 text-sm font-semibold mb-4 block cursor-pointer"
        >
          {{ state.showFullDescription ? 'Pokaż mniej' : 'Pokaż więcej' }}
        </button>

        <h3 class="text-red-700 mb-2">
          <i class="pi pi-map-marker text-orange-500"></i>
          location: {{ state.job.location }}
        </h3>
        
        <hr class="my-4">
        
        <!-- Bezpieczne odwołanie do salaryRange -->
        <h3 v-if="state.job.salaryRange" class="text-green-700 mb-4">
          {{ state.job.salaryRange.from }} - {{ state.job.salaryRange.to }} {{ state.job.salaryRange.currency }}
        </h3>

        <RouterLink 
          :to="`/jobs/${state.job.id}`" 
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Apply Now
        </RouterLink>
      </div>
    </div>
  </section>

  <div class="text-center text-gray-500 py-6">
    <PulseLoader :loading="state.isLoading" color="#38a169" size="15px" />
  </div>
</template>