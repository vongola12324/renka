<template>
  <div 
    :class="{ 'font-bold text-blue-600 dark:text-blue-400': isActive, 'text-gray-700 dark:text-gray-300': !isActive }"
    class="flex transition-all duration-300 ease-in-out leading-relaxed cursor-pointer"
    @click="$emit('seek', line.time)"
  >
    <span class="text-sm text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0 w-16 text-right content-center">
      {{ formatTime(line.time) }}
    </span>
    <div class="lyrics-line flex-grow">
      <ruby v-for="(part, partIndex) in parseLyrics(line.text, line.furigana)" :key="partIndex">
        <rt v-if="part.furigana">{{ part.furigana }}</rt>
        {{ part.text }}
      </ruby>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import '~/assets/styles/lyrics.css'

const props = defineProps({
  line: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['seek'])

const parseLyrics = (text, furigana) => {
  const parts = []
  const textParts = text.split('//')
  
  textParts.forEach((part, index) => {
    const furiganaEntry = furigana?.find(f => f.text === part)
    if (furiganaEntry) {
      parts.push({
        text: part,
        furigana: furiganaEntry.reading
      })
    } else {
      parts.push({ text: part })
    }
  })

  return parts
}

const formatTime = (time) => {
  const minutes = time.minutes.toString().padStart(2, '0')
  const seconds = time.seconds.toString().padStart(2, '0')
  return `[${minutes}:${seconds}]`
}
</script>