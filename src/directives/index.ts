import type { App } from 'vue';
import useAuth from './auth/index';
import useLazyLoad from './lazyload/index';
import usePrivateUrl from '@/directives/image';

export default function setupDirectives(app: App) {
  useAuth(app);
  useLazyLoad(app);
  usePrivateUrl(app);
}
