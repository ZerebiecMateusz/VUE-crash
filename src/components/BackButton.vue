<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <button
        @click="goBack"
        class="text-green-500 hover:text-green-600 text-sm font-semibold mb-4 flex items-center gap-2 cursor-pointer border-none bg-transparent p-0"
      >
        <i class="pi pi-arrow-left"></i>
        <span>Back to Jobs List</span>
      </button>
    </div>
  </section>
</template>