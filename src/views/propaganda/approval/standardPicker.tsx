import { listStandCascadeList } from '@/api/media/scoreStandard'
import { join } from 'lodash'
import { Field, Popup, Cascader, PickerOption } from 'vant'

export default defineComponent({
  name: 'StandardPicker',
  props: {
    scoreDetailId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit, attrs }) {
    const scoreOption = ref<any[]>([])

    const picked = computed({
      get: () => {
        const res = props.scoreDetailId.split(',')
        return res ? res[3] : ''
      },
      set: (val) => {
        emit('update:scoreDetailId', val)
      },
    })

    const picked_text = computed(() => {
      return getPickedText(scoreOption.value, props.scoreDetailId)
    })

    const rmEmptyChildren = (arr: any[]) => {
      for (let item of arr) {
        if (item.children.length === 0) {
          delete item.children
        } else {
          rmEmptyChildren(item.children)
        }
      }
      return arr
    }

    type OptionItem = {
      id: string
      text: string
      children: OptionItem[]
    }

    const getPickedText = (options: OptionItem[], ids: string) => {
      if (!ids || !options.length) return ''

      const idArr = ids.split(',').slice(0, 4)

      let children: OptionItem[] = []
      return idArr.reduce((prev, cur, index) => {
        let option: OptionItem | undefined
        if (index === 0) {
          option = options.find((item) => item.id === cur)
        } else {
          option = children.find((item) => item.id === cur)
        }
        if (!option) return prev
        children = option.children
        return index === 0 ? prev + option.text : prev + ' > ' + option.text
      }, '')
    }

    const getTreeOptions = async () => {
      try {
        // 获取赋分依据级联下拉框
        const { data } = await listStandCascadeList({
          type: '',
          operaType: '',
        })
        emit('load', data.mainId)
        scoreOption.value = rmEmptyChildren(data.data)
      } catch (e) {
        console.error(e)
      }
    }

    const fieldNames = {
      text: 'text',
      value: 'id',
      children: 'children',
    }

    const onFinish = ({ selectedOptions }: PickerOption) => {
      picked.value = selectedOptions.map((i: any) => i.id)?.join()
      show.value = false
      emit('finish', selectedOptions)
    }

    const show = ref(false)

    onBeforeMount(getTreeOptions)

    return () => (
      <>
        {/* 赋分依据 */}
        <Field
          v-model={picked_text.value}
          is-link
          label="赋分依据"
          placeholder="请选择赋分依据"
          required
          rules={[{ required: true, message: '请选择赋分依据' }]}
          onClick={() => {
            show.value = true
          }}
        />
        <Popup
          round
          v-model:show={show.value}
          position="bottom"
          teleport="body"
        >
          <Cascader
            v-model={picked.value}
            title="赋分依据"
            closeable={false}
            options={scoreOption.value}
            field-names={fieldNames}
            onFinish={onFinish}
          />
        </Popup>
      </>
    )
  },
})
