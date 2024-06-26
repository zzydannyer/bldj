import { Ref } from 'vue';

export default function <T>(formData: T): [Ref<T>, () => void] {
  const form = ref(formData) as Ref<T>;

  function resetForm() {
    form.value = formData;
  }
  return [form, resetForm];
}
