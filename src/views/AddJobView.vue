<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const form = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  salary: 'under $50K',
  location: '',
  company: {
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  }
})

const toast = useToast()

const handleSubmit = async (e) => {
    if (e) e.preventDefault() // Jawne zatrzymanie przeładowania
  const newJob = {
    type: form.type,
    title: form.title,
    description: form.description,
    salaryRange: {
      from: form.salary.split(' - ')[0],
      to: form.salary.split(' - ')[1] || '',
      currency: 'USD'
    },
    location: form.location,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone
    }
  }

  try {
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.status}`)
    }

    const data = await response.json()
    localStorage.setItem('toastMessage', 'Job added successfully!')
    router.push('/jobs')
  } catch (error) {
    console.error('Błąd podczas wysyłania:', error)
    
    // Toast błędu — pojawi się, gdy serwer nie odpowiada lub zwróci błąd
    toast.error('Failed to add job. Check your API server.')
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-center mb-6">Add Job</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Job Type -->
      <div>
        <label for="type" class="block font-bold mb-2">Job Type</label>
        <select
          id="type"
          v-model="form.type"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <!-- Job Listing Name -->
      <div>
        <label for="title" class="block font-bold mb-2">
          Job Listing Name <span class="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          v-model="form.title"
          placeholder="eg. Senior Vue Developer"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block font-bold mb-2">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          placeholder="Add any job duties, expectations, requirements, etc"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <!-- Salary -->
      <div>
        <label for="salary" class="block font-bold mb-2">Salary</label>
        <select
          id="salary"
          v-model="form.salary"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="under $50K">under $50K</option>
          <option value="$50K - $60K">$50K - $60K</option>
          <option value="$60K - $70K">$60K - $70K</option>
          <option value="$70K - $80K">$70K - $80K</option>
          <option value="$80K - $90K">$80K - $90K</option>
          <option value="$90K - $100K">$90K - $100K</option>
          <option value="Over $100K">Over $100K</option>
        </select>
      </div>

      <!-- Location -->
      <div>
        <label for="location" class="block font-bold mb-2">Location</label>
        <input
          id="location"
          type="text"
          v-model="form.location"
          placeholder="Company Location"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <h2 class="text-2xl font-bold mt-8 mb-4">Company Info</h2>

      <!-- Company Name -->
      <div>
        <label for="companyName" class="block font-bold mb-2">
          Company Name <span class="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          required
          v-model="form.company.name"
          placeholder="Company Name"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Company Description -->
      <div>
        <label for="companyDescription" class="block font-bold mb-2">Company Description</label>
        <textarea
          id="companyDescription"
          v-model="form.company.description"
          rows="4"
          placeholder="What does your company do?"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
      </div>

      <!-- Contact Email -->
      <div>
        <label for="ContactEmail" class="block font-bold mb-2">Contact Email</label>
        <input
          id="ContactEmail"
          type="email"
          v-model="form.company.contactEmail"
          placeholder="Enter contact email for applicants"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Contact Phone -->
      <div>
        <label for="ContactPhone" class="block font-bold mb-2">Contact Phone</label>
        <input
          id="ContactPhone"
          type="tel"
          v-model="form.company.contactPhone"
          placeholder="Enter contact phone for applicants"
          class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 mt-4"
        >
          Add Job
        </button>
      </div>
    </form>
  </div>
</template>