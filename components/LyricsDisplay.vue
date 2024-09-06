<template>
  <div>
    <h2 class="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Lyrics</h2>
    <div v-if="lyrics && lyrics.length > 0" class="space-y-2 text-base sm:text-lg">
      <div 
        v-for="(line, index) in lyrics" 
        :key="index" 
        :class="{ 'font-bold text-blue-600 dark:text-blue-400': isActive(line), 'text-gray-700 dark:text-gray-300': !isActive(line) }"
        class="flex transition-all duration-300 ease-in-out leading-relaxed cursor-pointer"
        @click="seekTo(line.time)"
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
    </div>
    <div v-else class="text-gray-600 dark:text-gray-400">
      No lyrics available.
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  lyrics: {
    type: Array,
    default: () => []
  },
  currentTime: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['seekTo'])

const isActive = (line) => {
  const currentSeconds = props.currentTime.minutes * 60 + props.currentTime.seconds
  const lineStartSeconds = line.time.minutes * 60 + line.time.seconds
  const lineEndSeconds = lineStartSeconds + line.time.length

  return currentSeconds >= lineStartSeconds && currentSeconds < lineEndSeconds
}

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

const seekTo = (time) => {
  emit('seekTo', time)
}
</script>

<style scoped>
.lyrics-line {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: flex-end;
}

ruby {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-right: 1px;
}

rt {
  font-size: 0.5em;
  line-height: 1;
  text-align: center;
  color: theme('colors.gray.500');
  @media (prefers-color-scheme: dark) {
    color: theme('colors.gray.400');
  }
  order: -1;
  margin-bottom: 0.1em;
}
</style>