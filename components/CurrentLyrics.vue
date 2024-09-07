<template>
  <div v-if="currentLyric" class="bg-black bg-opacity-50 text-white p-2 text-center">
    <p class="text-lg font-semibold lyrics-line">
      <template v-for="(part, index) in parseLyrics(currentLyric.text, currentLyric.furigana)" :key="index">
        <ruby v-if="part.furigana">
          <rt>{{ part.furigana }}</rt>
          {{ part.text }}
        </ruby>
        <span v-else>{{ part.text }}</span>
      </template>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import '~/assets/styles/lyrics.css'

const props = defineProps({
  lyrics: {
    type: Array,
    required: true
  },
  currentTime: {
    type: Object,
    required: true
  }
})

const currentLyric = computed(() => {
  const currentSeconds = props.currentTime.minutes * 60 + props.currentTime.seconds
  return props.lyrics.find(lyric => {
    const lyricStartSeconds = lyric.time.minutes * 60 + lyric.time.seconds
    const lyricEndSeconds = lyricStartSeconds + lyric.time.length
    return currentSeconds >= lyricStartSeconds && currentSeconds < lyricEndSeconds
  })
})

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
</script>
