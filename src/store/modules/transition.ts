import { defineStore } from 'pinia';

export default defineStore('transition', () => {
  const transitionName = ref('right');
  const setTransitionName = (name: string) => {
    transitionName.value = name;
  };
  return { transitionName, setTransitionName };
});
