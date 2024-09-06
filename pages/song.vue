<template>
  <div v-if="song" class="px-4 py-8">
    <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-center text-blue-600 dark:text-blue-400">{{ song.title }}</h1>
    <h2 class="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-600 dark:text-gray-400">{{ song.artist }}</h2>
    <div class="mb-8 max-w-3xl mx-auto">
      <YouTubePlayer 
        :videoId="song.videoId" 
        @timeUpdate="updateCurrentTime"
        ref="youtubePlayer"
      />
    </div>
    <div v-if="lyrics.length > 0" class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6 mb-8 max-w-3xl mx-auto">
      <LyricsDisplay 
        :lyrics="lyrics" 
        :currentTime="currentTime"
        @seekTo="seekToTime"
      />
    </div>
    <div v-else class="text-center text-gray-600 dark:text-gray-400">
      Loading lyrics...
    </div>
    <div class="text-center space-x-4 flex justify-center items-center">
      <NuxtLink 
        to="/" 
        class="inline-flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
        title="Back to Song Gallery"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </NuxtLink>
      <a 
        :href="youtubeUrl" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="inline-flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
        title="Watch on YouTube"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getYouTubeUrl } from '~/utils/youtubeHelper'
import { useSearchStore } from '~/composables/useSearchStore'

const route = useRoute()
const currentTime = ref({ minutes: 0, seconds: 0 })
const { songs, fetchSongs } = useSearchStore()
const lyrics = ref([])
const youtubePlayer = ref(null)

const song = computed(() => songs.value.find(s => s.videoId === route.query.id))

const youtubeUrl = computed(() => {
  if (song.value) {
    return getYouTubeUrl(song.value.videoId)
  }
  return ''
})

const fetchLyrics = async (videoId) => {
  try {
    const response = await fetch(`/lyrics/${videoId}.json`)
    const data = await response.json()
    lyrics.value = data.lyrics
  } catch (error) {
    if (process.dev) {
      console.error('Error fetching lyrics:', error)
    }
    lyrics.value = []
  }
}

onMounted(async () => {
  await fetchSongs()
})

watch(() => route.query.id, async (newId) => {
  if (newId) {
    await fetchLyrics(newId)
  }
}, { immediate: true })

const updateCurrentTime = (time) => {
  currentTime.value = time
}

const seekToTime = (time) => {
  if (youtubePlayer.value) {
    const seconds = time.minutes * 60 + time.seconds
    youtubePlayer.value.seekTo(seconds)
  }
}
</script>