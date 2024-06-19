import { PublicResourceFile } from '@/types/_media/publicResource';
import {
  addPublicResourceFile,
  getPublicResourceFile
} from '@/api/_media/publicResource';
import {
  showSuccessToast,
  PickerOption,
  showLoadingToast,
  closeToast
} from 'vant';
import { emitter } from '@/plugins/mitt';

export default function useResource() {
  const form = ref<PublicResourceFile>(new PublicResourceFile());
  const router = useRouter();
  const route = useRoute();
  const { id } = route.params;
  // * fileType 1：文档 2：图片 3：视频 4：其他
  const columns = [
    { value: '3', text: '视频' },
    { value: '2', text: '图片' },
    { value: '1', text: '其他' }
  ];

  // 提交
  const onSubmit = async () => {
    try {
      showLoadingToast({ message: '提交中...', forbidClick: true });
      const { code, msg } = await addPublicResourceFile(form.value);
      if (code !== 200) throw new Error(msg);
      showSuccessToast(id ? '修改成功' : '新增成功');
      emitter.emit('refresh');
      router.push('/public/resource');
    } catch (error) {
      console.error(error);
    } finally {
      closeToast();
    }
  };
  //获取详情
  const getPuliclist = async () => {
    if (!id) return;
    try {
      showLoadingToast({ message: '加载中...', forbidClick: true });
      const { data } = await getPublicResourceFile(id as string);
      form.value = data!;
    } finally {
      closeToast();
    }
  };

  return { columns, form, onSubmit, getPuliclist };
}
