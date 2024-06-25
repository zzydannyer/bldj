import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import useUserStore from './modules/user';
import useDictStore from './modules/dict';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

export default function setupStore(app: App<Element>) {
  app.use(pinia);
}

export function useStore() {
  return {
    userInfo: useUserStore(),
    dict: useDictStore()
  };
}
