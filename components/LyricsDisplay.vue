<template>
  <div>
    <h2 class="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Lyrics</h2>
    <div v-if="lyrics && lyrics.length > 0" class="space-y-2 text-base sm:text-lg">
      <LyricLine
        v-for="(line, index) in lyrics"
        :key="index"
        :line="line"
        :isActive="isActive(line)"
        @seek="$emit('seekTo', $event)"
      />
    </div>
    <div v-else class="text-gray-600 dark:text-gray-400">
      No lyrics available.
    </div>
  </div>
</template>

<script setup>
import LyricLine from './LyricLine.vue'

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
</script>