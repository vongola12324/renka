<template>
  <div class="max-h-[32rem] overflow-y-auto overscroll-contain">
    <ul class="divide-y divide-gray-200 dark:divide-gray-700" role="listbox">
      <li 
        v-for="(result, index) in results" 
        :key="result.videoId" 
        :class="[ 
          'cursor-pointer flex items-center px-4 py-4',
          { 'bg-gray-50 dark:bg-gray-700': index === activeIndex }
        ]"
        @mouseenter="activeIndex = index"
        @click="selectResult(result)"
        role="option"
      >
        <div class="flex-auto">
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100" v-html="highlightMatch(result.title)"></div>
          <div class="text-sm text-gray-500 dark:text-gray-400" v-html="highlightMatch(result.artist)"></div>
          <div class="text-xs text-gray-400 dark:text-gray-500" v-html="highlightMatch(getYouTubeUrl(result.videoId))"></div>
        </div>
        <div class="ml-3 flex-none">
          <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </li>
    </ul>
    <div v-if="results.length === 0" class="p-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
      No results found
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearchStore } from '~/composables/useSearchStore'
import { useRouter } from 'vue-router'
import { getYouTubeUrl } from '~/utils/youtubeHelper'

const props = defineProps({
  results: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close'])
const router = useRouter()
const { searchQuery } = useSearchStore()

const activeIndex = ref(-1)

const highlightMatch = (text: string) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<span class="bg-yellow-200 font-semibold">$1</span>')
}

const selectResult = (result) => {
  router.push(`/song?id=${result.videoId}`)
  emit('close')
}

watch(() => props.results, () => {
  activeIndex.value = -1
})

defineExpose({ activeIndex })
</script>