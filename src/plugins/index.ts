import type { App } from 'vue';
import useDict from '@/plugins/dict';
import download from '@/plugins/download';
import { parse } from '@/utils/date';
import { value_to_label, value_to_dict } from '@/utils';

export default function setupPlugins(app: App) {
  app.config.globalProperties.$download = download;
  app.config.globalProperties.$useDict = useDict;
  app.config.globalProperties.$parse = parse;
  app.config.globalProperties.$value_to_label = value_to_label;
  app.config.globalProperties.$value_to_dict = value_to_dict;
}
