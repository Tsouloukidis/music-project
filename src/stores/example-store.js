import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    playList: [{
      id: 1,
      title: 'Ado',
      src: '/music/Ado.mp3',
      duration: 0
    },
    {
      id: 2,
      title: 'fear of the dark',
      src: '/music/Iron Maiden  -  Fear of the Dark  -  Rock in Rio [High Quality].mp3',
      duration: 0
    },
  {
    id: 3,
      title: 'Ado1',
      src: '/music/Ado1.mp3',
      duration: 0
  },
{
  id: 4,
  title: 'Ado2',
  src: '/music/Ado2.mp3',
  duration: 0
},
{
  id: 5,
  title: 'Dynamax',
  src: '/music/Dynamax.mp3',
  duration: 0
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
