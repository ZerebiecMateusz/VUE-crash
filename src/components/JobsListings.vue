<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
const jobs = ref([]);

const toggleDescription = (job) => {
  job.showFull = !job.showFull;
};

const getTruncatedDescription = (job) => {
  if (!job.showFull && job.description.length > 90) {
    return job.description.substring(0, 90) + '...';
  }
  return job.description;
};

const state = reactive({
    jobs: [],
    isLoading: true,
})

onMounted(async () => {
  try {
    const response = await axios.get('/api/jobs');
    state.jobs = response.data.map(job => ({ ...job, showFull: false }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    state.isLoading = false;
  }
});

</script>
<template>
    <section class="bg-blue-50 px-4 py-10 m-6 rounded-lg shadow-md">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!-- Show loading spinner -->
            <div v-if="state.isLoading" class="flex justify-center items-center h-64">
                <PulseLoader :loading="state.isLoading" color="#38a169" size="15px" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="job in state.jobs" :key="job.title" class="bg-white p-6 rounded-lg shadow-md">
                    <h2>{{ job.type }}</h2>
                    <h1 class="font-bold text-xl text-gray-800 mb-3">{{ job.title }}</h1>
                    <p>{{ getTruncatedDescription(job) }}</p>
                    <button 
                        v-if="job.description.length > 90" 
                        @click="toggleDescription(job)" 
                        class="text-green-500 hover:text-green-600 text-sm font-semibold mb-4 block cursor-pointer"
                        >
                        {{ job.showFull ? 'Pokaż mniej' : 'Pokaż więcej' }}
                    </button>
                    <h3 class="text-red-700 mb-2">
                        <i class="pi pi-map-marker text-orange-500"></i>
                        location:  {{ job.location }}</h3>
                    <hr>
                    <h3 class="text-green-700 mb-2">{{ job.salaryRange.from }} - {{ job.salaryRange.to }} {{ job.salaryRange.currency }}</h3>
                    <RouterLink :to="`/jobs/${job.id}`"  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Apply Now
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>