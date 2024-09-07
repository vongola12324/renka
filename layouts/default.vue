<template>
  <div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <nav class="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl sm:text-2xl font-bold">RenKa</NuxtLink>
        <div class="flex items-center">
          <button @click="toggleDarkMode" class="mr-4 focus:outline-none">
            <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <button @click="toggleSearch" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <main class="flex-grow container mx-auto" :class="{ 'blur-transition': showSearch }">
      <slot />
    </main>
    <Footer class="mt-auto" />
    <Transition name="fade">
      <div v-if="showSearch" class="fixed inset-0 z-50 overflow-y-auto pt-16 sm:pt-24">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-25 dark:bg-gray-900 dark:bg-opacity-50 transition-opacity backdrop-blur-sm" @click="closeSearch"></div>
        <div class="relative bg-white dark:bg-gray-800 mx-auto max-w-2xl rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div class="relative">
            <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input 
              ref="searchInput"
              v-model="searchQuery" 
              type="text" 
              placeholder="Search songs..." 
              class="block w-full border-0 pl-10 pr-4 py-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 focus:ring-0 focus:outline-none sm:text-sm"
              @keydown.down.prevent="navigateResults('down')"
              @keydown.up.prevent="navigateResults('up')"
              @keydown.enter.prevent="selectResult"
              @keydown.esc="closeSearch"
            >
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700"></div>
          <SearchResults v-if="searchQuery" :results="search" @close="closeSearch" ref="searchResults" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useSearchStore } from '~/composables/useSearchStore'
import SearchResults from '~/components/SearchResults.vue'
import Footer from '~/components/Footer.vue'
import { useRouter } from 'vue-router'
import { useDarkMode } from '~/composables/useDarkMode'

const { searchQuery, songs, fetchSongs, search } = useSearchStore()
const showSearch = ref(false)
const searchResults = ref(null)
const searchInput = ref(null)
const router = useRouter()
const { isDarkMode, toggleDarkMode, initDarkMode } = useDarkMode()

onMounted(async () => {
  await fetchSongs()
  initDarkMode()
})

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchQuery.value = ''
  }
}

const closeSearch = () => {
  searchQuery.value = ''
  showSearch.value = false
}

const navigateResults = (direction) => {
  if (!searchResults.value) return
  const currentIndex = searchResults.value.activeIndex
  const maxIndex = search.value.length - 1
  if (direction === 'down') {
    searchResults.value.activeIndex = currentIndex < maxIndex ? currentIndex + 1 : 0
  } else {
    searchResults.value.activeIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex
  }
}

const selectResult = () => {
  if (!searchResults.value || searchResults.value.activeIndex === -1) return
  const selectedSong = search.value[searchResults.value.activeIndex]
  router.push(`/song?id=${selectedSong.videoId}`)
  closeSearch()
}

watch(searchQuery, (newValue) => {
  if (process.dev) {
    console.log('Search query changed:', newValue)
  }
})

watch(search, (newValue) => {
  if (process.dev) {
    console.log('Search results:', newValue)
  }
})

watch(songs, (newValue) => {
  if (process.dev) {
    console.log('Songs data updated:', newValue , { deep: true })
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.blur-transition {
  transition: filter 0.3s ease-out;
  filter: blur(5px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.min-h-screen {
  min-height: 100vh;
}

.flex-grow {
  flex-grow: 1;
}

.mt-auto {
  margin-top: auto;
}
</style>