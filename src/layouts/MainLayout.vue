<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->
        <q-toolbar-title>
          Music Player
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list bordered>
        <q-item v-for="(song, index) in songs" :key="song.id" @click="isplaying === false ? playSound(index) : stopSound()"
          clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="headphones" />
          </q-item-section>
          <q-item-section>{{ song.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { useCounterStore } from 'stores/example-store.js'
// import { ref } from 'vue'

// const store = useCounterStore()
// const leftDrawerOpen = ref(false)
// const songs = store.playList
// const isplaying = ref(false)
// const audio = ref(null)
// const music = ref(null)

// function playSound(currentIndex) {
//   music.value.currentIndex = currentIndex
//   music.value.playSound()
//   music.value.isplaying = true
//   // audio.value = new Audio(src)
//   // audio.value.play()
//   // isplaying.value = true
// }

// function stopSound() {
//   music.value.stopSound()
//   music.value.isplaying = false
//   // audio.value.pause()
//   // isplaying.value = false
// }

// const toggleLeftDrawer = () => {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

</script>
