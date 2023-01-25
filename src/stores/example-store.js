import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    playList: [{
      id: 1,
      title: 'master of puppets',
      src: '/music/Master of Puppets (Remastered).mp3',
    },
    {
      id: 2,
      title: 'fear of the dark',
      src: '/music/Iron Maiden  -  Fear of the Dark  -  Rock in Rio [High Quality].mp3'
    }]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },

  },
});
