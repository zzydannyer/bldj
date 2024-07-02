import MediaServer, { CategoryOption } from '@/api/culture/media';
import { Ref } from 'vue';
import { flatten } from 'lodash';

export default function (): [Ref<CategoryOption[]>, () => Promise<void>] {
  const categoryOption = ref<CategoryOption[]>([]);

  async function getOptions() {
    const { data } = await MediaServer.GET_CATEGORY();

    categoryOption.value = flatten(
      data.map((item: CategoryOption) => item.children)
    );
  }
  return [categoryOption, getOptions];
}
