<template>
  <div class="aspect-w-16 aspect-h-9 relative">
    <img v-if="!playerLoaded" :src="`https://img.youtube.com/vi/${videoId}/0.jpg`" @click="loadPlayer" class="w-full h-full object-cover cursor-pointer" />
    <div v-else :id="playerId" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['timeUpdate', 'stateChange'])

const playerId = ref(`youtube-player-${Math.random().toString(36).substr(2, 9)}`)
const playerLoaded = ref(false)
let player = null

const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
    } else {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = () => resolve(window.YT)
    }
  })
}

const createPlayer = (YT) => {
  player = new YT.Player(playerId.value, {
    height: '100%',
    width: '100%',
    videoId: props.videoId,
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      origin: window.location.origin
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

const onPlayerReady = (event) => {
  // Player is ready
  emit('stateChange', 'ready')
}

const onPlayerStateChange = (event) => {
  switch (event.data) {
    case YT.PlayerState.UNSTARTED:
      emit('stateChange', 'unstarted')
      break
    case YT.PlayerState.ENDED:
      emit('stateChange', 'ended')
      break
    case YT.PlayerState.PLAYING:
      emit('stateChange', 'playing')
      break
    case YT.PlayerState.PAUSED:
      emit('stateChange', 'paused')
      break
    case YT.PlayerState.BUFFERING:
      emit('stateChange', 'buffering')
      break
    case YT.PlayerState.CUED:
      emit('stateChange', 'cued')
      break
  }
}

const updateTime = () => {
  if (player && player.getCurrentTime) {
    const currentTime = player.getCurrentTime()
    emit('timeUpdate', {
      minutes: Math.floor(currentTime / 60),
      seconds: Math.floor(currentTime % 60)
    })
  }
}

const loadPlayer = async () => {
  playerLoaded.value = true
  const YT = await loadYouTubeAPI()
  createPlayer(YT)
}

const seekTo = (seconds) => {
  if (player && player.seekTo) {
    player.seekTo(seconds)
  }
}

onMounted(() => {
  loadPlayer()
})

let intervalId = null

watch(() => props.videoId, (newVideoId) => {
  if (player && player.loadVideoById) {
    player.loadVideoById(newVideoId)
  }
})

onMounted(() => {
  intervalId = setInterval(updateTime, 100)
})

onUnmounted(() => {
  if (player && player.destroy) {
    player.destroy()
  }
  if (intervalId) {
    clearInterval(intervalId)
  }
})

defineExpose({ seekTo })
</script>