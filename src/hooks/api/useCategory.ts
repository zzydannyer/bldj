import MediaServer, { CategoryOption } from '@/api/culture/media';
import { Ref } from 'vue';
import { UserType } from '@/constants';
export default function (
  userType: UserType
): [Ref<CategoryOption[]>, () => Promise<void>] {
  const categoryOption = ref<CategoryOption[]>([]);

  async function getOptions() {
    const { data } = await MediaServer.GET_CATEGORY();

    switch (userType) {
      case UserType.Group:
        categoryOption.value = data[0].children;
        break;
      case UserType.Grassroots:
        categoryOption.value = data[1].children;
        break;
      default:
        categoryOption.value = [];
    }
  }
  return [categoryOption, getOptions];
}
