<template>
  <q-page class>
    <div class="audio-container">
      <div class="row q-ma-md">
        <div class="col-12">
          <div>
            <q-list class="list" bordered>
              <q-item v-for="song in songs" :key="song.id" @click="isplaying === false ? play(song.src) : stopSound()"
                clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="headphones" />
                </q-item-section>
                <q-item-section>{{ song.title }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
    <div class="controls row flex flex-center fixed-bottom q-pb-md q-pt-md shadow-10">
      <div class>
        <q-btn color="primary" flat round icon="fast_rewind" size="xl" @click="back()" />

        <q-btn v-if="isplaying" color="primary" round icon="pause" size="xl" @click="stopSound()" />

        <q-btn v-if="!isplaying" color="primary" round icon="play_arrow" size="xl" @click="playSound()" />

        <q-btn color="primary" flat round icon="fast_forward" size="xl" @click="next()" />
      </div>
    </div>
  </q-page>

</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useCounterStore } from 'stores/example-store.js'

window.app = getCurrentInstance()
const store = useCounterStore()
const audio = ref(null)
const currentIndex = ref(0)
const isplaying = ref(false)
const songs = store.playList

const currentTrack = computed(() => {
  return songs[currentIndex.value]
})

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
  if (currentIndex.value > songs.length - 1) {
    currentIndex.value = 0
  }
  stopSound()
  currentTrack.value = songs[currentIndex]
  audio.value = new Audio(currentTrack.value.src)
  audio.value.play(currentTrack)
  isplaying.value = true
}

function back() {
  currentIndex.value--
  if (currentIndex.value < 0) {
    currentIndex.value = songs.length - 1
  }
  stopSound()
  currentTrack.value = songs[currentIndex]
  audio.value = new Audio(currentTrack.value.src)
  audio.value.play(currentTrack)
  isplaying.value = true
}

function play(src) {
  audio.value = new Audio(src)
  audio.value.play()
  isplaying.value = true
}

</script>

<style>
.controls {
  background-color: white;
}

.list {
  border-color: black;
}

.audio-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))
}
</style>
