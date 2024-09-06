<template>
  <div class="px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">Welcome to RenKa</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      <NuxtLink 
        v-for="song in songs" 
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSearchStore } from '~/composables/useSearchStore'

const { songs, fetchSongs } = useSearchStore()

onMounted(async () => {
  await fetchSongs()
  console.log('Songs fetched:', songs.value)
})
</script>