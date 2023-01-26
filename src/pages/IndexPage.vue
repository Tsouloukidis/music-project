<template>
  <q-page class>
    <div class="audio-container">
      <div class="row q-ma-md">
        <div class="col-12">
          <div>
            <q-list class="list" bordered>
              <q-item v-for="(song, index) in songs" :key="song.id" clickable v-ripple
                @click="isplaying === false ? (play(song.src), currentIndex = index) : stopSound()">
                <q-item-section avatar>
                  <q-icon color="primary" name="headphones" />
                </q-item-section>
                <q-item-section>{{ song.title }}</q-item-section>
                <q-item-section>
                  <q-icon v-if="currentIndex === index && isplaying === true" color="primary" name="play_arrow" />
                </q-item-section>
                <q-item-section v-if="currentIndex === index && isplaying === true">{{ timeLabel }}</q-item-section>
                <q-item-section>
                  <q-icon color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-slider v-model="currentTime" :min="0" :max="duration" :step="1" color="primary" width="100px" v-if="currentIndex === index && isplaying === true"
                    @change="newtime()" @pan="newtime()" />
                    </q-item-section>
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
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useCounterStore } from 'stores/example-store.js'

window.app = getCurrentInstance()
const store = useCounterStore()
const audio = ref(null)
const currentIndex = ref(0)
const isplaying = ref(false)
const songs = store.playList
const duration = ref(0)
const currentTime = ref(0)
const timeLabel = ref('00:00:00')
const thisSource = ref('')

function playSound() {
  audio.value = new Audio(songs[currentIndex.value].src)
  newtime()
  audio.value.addEventListener('timeupdate', function () {
      currentTime.value = audio.value.currentTime
      duration.value = audio.value.duration
      const hr = Math.floor(currentTime.value / 3600)
      const min = Math.floor((currentTime.value - (hr * 3600)) / 60)
      const sec = Math.floor(currentTime.value - (hr * 3600) - (min * 60))
      timeLabel.value = `${hr.toString()
        .padStart(2, '0')}:${min.toString()
          .padStart(2, '0')}:${sec.toString()
            .padStart(2, '0')}`
    })
  audio.value.play()
  isplaying.value = true
}
function stopSound() {
  audio.value.pause()
  newtime()
  isplaying.value = false
}

function next() {
  if (currentIndex.value === songs.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  stopSound()
  play(songs[currentIndex.value].src)
  isplaying.value = true
}

function back() {
  if (currentIndex.value === 0) {
    currentIndex.value = songs.length -1
  } else {
    currentIndex.value--
  }
  stopSound()
  play(songs[currentIndex.value].src)
  isplaying.value = true
}

function play(src) {
  if (audio.value.paused && thisSource.value !== src) {
    thisSource.value = src
    audio.value = new Audio(src)
    audio.value.addEventListener('timeupdate', function () {
      currentTime.value = audio.value.currentTime
      duration.value = audio.value.duration
      const hr = Math.floor(currentTime.value / 3600)
      const min = Math.floor((currentTime.value - (hr * 3600)) / 60)
      const sec = Math.floor(currentTime.value - (hr * 3600) - (min * 60))
      timeLabel.value = `${hr.toString()
        .padStart(2, '0')}:${min.toString()
          .padStart(2, '0')}:${sec.toString()
            .padStart(2, '0')}`
    })
    audio.value.play()
    isplaying.value = true
  } else {
    audio.value.play()
    isplaying.value = true
  }
}
function newtime() {
  audio.value.currentTime = currentTime.value
}

onMounted(() => {
  audio.value = new Audio(songs.src)
})

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
