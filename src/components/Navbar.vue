<script setup>
    import logo from '../assets/vue.svg' 
    import { RouterLink, useRoute } from 'vue-router';

    const isActiveLink = (path) => {
        const route = useRoute();
        return route.path === path;
    };
</script>

<template>
  <nav class="bg-green-700 border-green-500 text-white p-4">
    <div class="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex items-center">
          <img v-bind:src="logo" alt="Vue Logo" class="h-8 w-8 mr-2" />
          <span class="font-semibold text-xl">Vue Jobs</span>
        </div>
        <div>
            <RouterLink 
            to="/" 
            :class="[isActiveLink('/') 
              ? 'bg-green-900' 
              : 'hover:bg-gray-900 hover:text-white', `text-white hover:text-gray-300 px-6 py-2 rounded-md font-medium`]"
              >Home</RouterLink>
            <RouterLink to="/jobs" :class="[isActiveLink('/jobs') 
              ? 'bg-green-900' 
              : 'hover:bg-gray-900 hover:text-white', `text-white hover:text-gray-300 px-6 py-2 rounded-md font-medium`]">Jobs</RouterLink>
            <RouterLink to="/jobs/add" :class="[isActiveLink('/jobs/add') 
              ? 'bg-green-900' 
              : 'hover:bg-gray-900 hover:text-white', `text-white hover:text-gray-300 px-6 py-2 rounded-md font-medium`]">Add Job</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>