<template>
  <q-page class>
    <div class="audio-container">
      <div class="row q-ma-md">
        <div class="col-12">
          <div id="waveform"></div>
        </div>
      </div>
    </div>
    <div class="controls row flex flex-center fixed-bottom q-pb-md q-pt-md shadow-10">
      <div class>
        <q-btn color="primary" flat round icon="fast_rewind" size="xl" @click="back()" />

        <q-btn color="primary" round icon="pause" size="xl" @click="stopSound()" />

        <q-btn color="primary" round icon="play_arrow" size="xl" @click="playSound()" />

        <q-btn color="primary" flat round icon="fast_forward" size="xl" @click="next()" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { date } from 'quasar'

const $q = useQuasar()
const audio = ref(null)
const currentIndex = ref(0)
const playList = ref([{
    id: 1,
    title: 'master of puppets',
    src: '/music/Master of Puppets (Remastered).mp3',
  },
  {
    id:2,
    title: 'fear of the dark',
    src: '/music/Iron Maiden  -  Fear of the Dark  -  Rock in Rio [High Quality].mp3'
  }])
var isplaying = ref(false)

const currentTrack = computed(() => {
  return playList.value[currentIndex.value]
})

$q.localStorage.set(audio)
const value = $q.localStorage.getItem(audio)

$q.sessionStorage.set(audio)
const otherValue = $q.sessionStorage.getItem(audio)

function playSound() {
  audio.value = new Audio(currentTrack.value.src)
  audio.value.play()
  isplaying.value = true
}
function stopSound() {
  audio.value.pause()
  isplaying.value = false
}

function next() {
  currentIndex.value++
  if(currentIndex.value > playList.value.length -1){
    currentIndex.value = 0
  }
  currentTrack.value = playList.value[currentIndex]
  audio.value = new Audio(currentTrack.value.src)
  audio.value.play(currentTrack)

}

function back(){
  currentIndex.value--
  if(currentIndex < 0) {
    currentIndex.value = playList.value.length -1
  }
  currentTrack.value = playList.value[currentIndex]
  audio.value = new Audio(currentTrack.value.src)
  audio.play(currentTrack)

}
</script>

<style>
.controls {
  background-color: white;
}

.audio-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))
}
</style>
