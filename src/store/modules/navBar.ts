import { defineStore } from 'pinia';

export default defineStore('navBar', () => {
  const visible = ref(true);

  const setVisible = (_visible: boolean) => {
    visible.value = _visible;
  };

  const watchScrollTop = () => {
    const app = document.querySelector('#app')! as HTMLElement;
    if (app.scrollTop < 100) setVisible(true);
    else setVisible(false);
  };
  return { visible, setVisible, watchScrollTop };
});
