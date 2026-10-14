 <script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { reactive, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import BackButton from '../components/BackButton.vue';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;

const state = reactive({
    job: null,
    isLoading: true,
    showFullDescription: false,
    isDeleting: false // 👈 Dodana flaga
});

const deleteJob = async () => {
  if (!window.confirm('Are you sure you want to delete this job?')) return;
  state.isDeleting = true; // 👈 Blokujemy ewentualne zapytania w tle
  try {
    const response = await axios.delete(`/api/jobs/${jobId}`);
    
    if (response.status === 200 || response.status === 204) {
      localStorage.setItem('toastMessage', 'Job deleted successfully!')
      router.push('/jobs')
}
  } catch (error) {
    console.error('Error deleting job:', error);
    toast.error('Failed to delete job. Please try again.');
    state.isDeleting = false;
  }
};

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
  // Jeśli właśnie usuwamy ofertę, nie pobierajmy jej ponownie
  if (state.isDeleting) return;

  try {
    const response = await axios.get(`/api/jobs/${jobId}`);
    state.job = response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    // Jeśli nie usuwamy i wyskoczył błąd 404, dopiero wtedy informujemy o braku oferty
    if (!state.isDeleting) {
      toast.error('Job not found.');
      router.push('/jobs');
    }
  } finally {
    state.isLoading = false;
  }
});

</script>

<template>
  <BackButton />
  
  <!-- Wyświetlaj sekcję TYLKO wtedy, gdy ładowanie się skończyło i obiekt job faktycznie istnieje -->
  <section v-if="!state.isLoading && state.job" class="bg-blue-50 px-4 py-10 m-6 rounded-lg shadow-md">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Job Details
      </h2>

      <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2>{{ state.job.type }}</h2>
        <h1 class="font-bold text-xl text-gray-800 mb-3">{{ state.job.title }}</h1>
        
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
        
        <h3 v-if="state.job.salaryRange" class="text-green-700 mb-4">
          {{ state.job.salaryRange.from }} - {{ state.job.salaryRange.to }} {{ state.job.salaryRange.currency }}
        </h3>

        <RouterLink 
          :to="`/jobs/edit/${state.job.id}`" 
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
        >
          Edit Job
        </RouterLink>
        <button 
          type="button"
          @click="deleteJob" 
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-block ml-2 cursor-pointer"
        >
          Delete Job
        </button>
      </div>
    </div>
  </section>

  <div class="text-center text-gray-500 py-6" v-if="state.isLoading">
    <PulseLoader :loading="state.isLoading" color="#38a169" size="15px" />
  </div>
</template>