<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Music Player
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-list bordered>
      <q-item v-for="song in songs" :key="song.id" @click="play()" clickable>
        <q-item-section avatar>
          <q-icon  color="primary" name="headphones" />
        </q-item-section>
        <q-item-section>{{song.title}}</q-item-section>
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
const songs = store.playList
const play = () => store.playSound()

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

</script>
