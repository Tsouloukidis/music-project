<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Music Player
        </q-toolbar-title>
        <!-- <q-uploader
          url="http://localhost:8080/music"
          color="teal"
          flat
          bordered
          style="max-width: 300px"
          label="Custom list"
          accept="audio/*,.mp3"
          multiple
        >
        <template v-slot:list="scope">
        <q-list separator>

          <q-item v-for="file in scope.files" :key="file.__key">
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label caption>
                Status: {{ file.__status }}
              </q-item-label>

              <q-item-label caption>
                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
              </q-item-label>
            </q-item-section>

            <q-item-section
              v-if="file.__img"
              thumbnail
              class="gt-xs"
            >
              <img :src="file.__img.src">
            </q-item-section>

            <q-item-section top side>
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="scope.removeFile(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
        </q-uploader> -->
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list bordered>
        <q-item v-for="song in songs" :key="song.id" @click="isplaying === false ? playSound(song.src) : stopSound()"
          clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="headphones" />
          </q-item-section>
          <q-item-section>{{ song.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useCounterStore } from 'stores/example-store.js'
import { ref } from 'vue'

const store = useCounterStore()
const leftDrawerOpen = ref(false)
const songs = store.playList
const isplaying = ref(false)
const audio = ref(null)

function playSound(src) {
  audio.value = new Audio(src)
  audio.value.play()
  isplaying.value = true
}

function stopSound() {
  audio.value.pause()
  isplaying.value = false
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
