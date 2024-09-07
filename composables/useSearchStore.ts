import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#app'

interface Song {
  videoId: string
  title: string
  artist: string
}

export const useSearchStore = () => {
  const searchQuery = ref('')
  const songs = ref<Song[]>([])
  const config = useRuntimeConfig()
  const currentPage = ref(1)
  const songsPerPage = 12 // Adjust this number as needed

  const fetchSongs = async () => {
    if (songs.value.length === 0) {
      try {
        const response = await fetch(`${config.app.baseURL}songs.json`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!")
        }
        songs.value = await response.json()
        if (process.dev) {
          console.log('Songs fetched:', songs.value)
        }
      } catch (error) {
        if (process.dev) {
          console.error('Error fetching songs:', error)
          console.error('Response:', await error.response?.text())
        }
        songs.value = []
      }
    }
  }

  const search = computed(() => {
    if (!searchQuery.value) return []
    return songs.value.filter(song => 
      song.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      song.videoId.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const paginatedSongs = computed(() => {
    const start = (currentPage.value - 1) * songsPerPage
    const end = start + songsPerPage
    return songs.value.slice(start, end)
  })

  const totalPages = computed(() => Math.ceil(songs.value.length / songsPerPage))

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  return {
    searchQuery,
    songs,
    fetchSongs,
    search,
    paginatedSongs,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage
  }
}