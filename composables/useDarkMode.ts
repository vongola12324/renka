import { ref, watch } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(false)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateDarkMode()
  }

  const updateDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }

  const initDarkMode = () => {
    const darkModePreference = localStorage.getItem('darkMode')
    isDarkMode.value = darkModePreference === 'true' || 
      (!darkModePreference && window.matchMedia('(prefers-color-scheme: dark)').matches)
    updateDarkMode()
  }

  watch(isDarkMode, updateDarkMode)

  return { isDarkMode, toggleDarkMode, initDarkMode }
}