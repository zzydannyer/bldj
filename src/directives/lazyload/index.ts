import type { App } from 'vue';
import { Lazyload } from 'vant';

export default function useLazyLoad(app: App) {
  app.use(Lazyload, {
    lazyComponent: true
  });
}
