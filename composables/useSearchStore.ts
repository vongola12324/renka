import { ref, computed } from 'vue'

interface Song {
  videoId: string
  title: string
  artist: string
}

export const useSearchStore = () => {
  const searchQuery = ref('')
  const songs = ref<Song[]>([])

  const fetchSongs = async () => {
    if (songs.value.length === 0) {
      try {
        const response = await fetch('songs.json')
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

  return {
    searchQuery,
    songs,
    fetchSongs,
    search
  }
}