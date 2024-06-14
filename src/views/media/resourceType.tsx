import VCascader from '@/components/VCascader/index.vue'
import { treeResourceCategory } from '@/api/media'

export default defineComponent({
  props: {
    modelValue: {
      type: Number,
      default: -1,
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const categoryOptions = ref<any[]>([])
    const resourceType = computed({
      get: () => props.modelValue,
      set: (val) => {
        emit('update:modelValue', val)
      },
    })
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          resourceType.value = val
        }
      }
    )
    const fieldNames = {
      text: 'label',
      value: 'id',
      children: 'children',
    }
    const getResourceCategoryList = async () => {
      const { data } = await treeResourceCategory()
      categoryOptions.value = data!
    }
    onBeforeMount(getResourceCategoryList)
    return () => (
      <VCascader
        required={props.required}
        rules={
          props.required
            ? [{ required: true, message: '素材类别不能为空' }]
            : undefined
        }
        v-model={resourceType.value}
        options={categoryOptions.value}
        field-names={fieldNames}
        label="素材类别"
        placeholder="请选择素材类别"
      />
    )
  },
})
