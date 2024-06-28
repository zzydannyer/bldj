import type { App } from 'vue';
import useDict from '@/plugins/dict';
import download from '@/plugins/download';
import { parse } from '@/utils/date';
import { parseDict } from '@/utils';

export default function setupPlugins(app: App) {
  app.config.globalProperties.$download = download;
  app.config.globalProperties.$useDict = useDict;
  app.config.globalProperties.$parse = parse;
  app.config.globalProperties.$parseDict = parseDict;
}
