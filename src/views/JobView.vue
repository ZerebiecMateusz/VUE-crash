<script setup></script>
<template>
    <section class="bg-blue-50 px-4 py-10 m-6 rounded-lg shadow-md">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="job in jobs" :key="job.title" class="bg-white p-6 rounded-lg shadow-md">
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
                    <RouterLink :to="job.apply" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Apply Now
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>
</template>