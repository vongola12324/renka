<template>
  <footer class="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4">
    <div class="container mx-auto text-center">
      <div class="flex justify-center items-center space-x-4">
        <p>&copy; {{ copyrightYear }} RenKa</p>
        <a :href="config.public.githubRepo" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
          View on GitHub
        </a>
      </div>
      <p class="mt-2 text-xs italic">
        This project was created with AI assistance (Claude 3.5 Sonnet & ChatGPT). Song information and lyrics are property of their respective owners. This is an educational project, not for commercial use.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const copyrightYear = computed(() => {
  const currentYear = new Date().getFullYear()
  const startYear = 2024
  return currentYear > startYear ? `${startYear}-${currentYear}` : startYear.toString()
})
</script>