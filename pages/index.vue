<template>
  <div class="px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <NuxtLink 
        v-for="song in paginatedSongs" 
        :key="song.videoId" 
        :to="`/song?id=${song.videoId}`" 
        class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
      >
        <div class="aspect-w-16 aspect-h-9">
          <img :src="`https://img.youtube.com/vi/${song.videoId}/0.jpg`" alt="Song thumbnail" class="object-cover w-full h-full">
        </div>
        <div class="p-3 sm:p-4">
          <h2 class="text-lg sm:text-xl font-semibold text-blue-700 dark:text-blue-400 truncate">{{ song.title }}</h2>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate">{{ song.artist }}</p>
        </div>
      </NuxtLink>
    </div>
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center items-center space-x-4">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span class="text-gray-700 dark:text-gray-300">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSearchStore } from '~/composables/useSearchStore'

const { paginatedSongs, fetchSongs, currentPage, totalPages, nextPage, prevPage } = useSearchStore()

onMounted(async () => {
  await fetchSongs()
})
</script>