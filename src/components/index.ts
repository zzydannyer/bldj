import type { App, Component } from 'vue';
import VCard from '@/components/VCard/index.vue';
import VInsetList from '@/components/VInsetList/index.vue';
import VSearch from '@/components/VSearch/index.vue';
import VUploader from '@/components/VUploader/index.vue';
import VPreview from '@/components/VPreview/index.vue';
import VPlainTag from '@/components/VPlainTag/index.vue';
import VTag from '@/components/VTag/index.vue';
import VPlainButton from '@/components/VPlainButton/index.vue';
import VPicker from '@/components/VPicker/index.vue';
import VCascader from '@/components/VCascader/index.vue';
import VMultiPicker from '@/components/VMultiPicker/index.vue';
import VDatePicker from '@/components/VDatePicker/index.vue';
import VAreaPicker from '@/components/VAreaPicker/index.vue';
import VImage from '@/components/VImage/index.vue';

const components: Component[] = [
  VCard,
  VInsetList as Component,
  VSearch,
  VUploader,
  VPreview,
  VPlainTag,
  VTag,
  VPlainButton,
  VPicker,
  VCascader,
  VMultiPicker,
  VDatePicker,
  VAreaPicker,
  VImage
];

// 注册全局组件
const install = (app: App) => {
  components.forEach((component) => app.component(component.name!, component));
};

export default function setupComponents(app: App) {
  app.use({ install });
}
