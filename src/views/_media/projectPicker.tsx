import { listProjectSelectOptions } from '@/api/_media/project';
import {
  PickerOption,
  Field,
  Popup,
  Picker,
  Search,
  type FieldRule
} from 'vant';
import { debounce } from 'lodash';
import { withModifiers } from 'vue';

export default defineComponent({
  name: 'ProjectPicker',
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array as PropType<FieldRule[]>,
      default: () => [{ required: true, message: '请选择项目名称' }]
    }
  },
  setup(props, { emit }) {
    const projectId = computed({
      get: () => [props.id],
      set: (val) => {
        emit('update:id', val);
      }
    });

    watch(
      () => props.id,
      (val) => {
        picked.value = [val];
      }
    );
    const projectName = computed({
      get: () => props.name,
      set: (val) => {
        emit('update:name', val);
      }
    });

    const searchVal = ref<string>('');
    const showProject = ref(false);
    const picked = ref<string[]>([]);
    const projectList = ref<{ id: number; name: string }[]>([]);
    // 项目工程名称
    const columnsFieldNames = {
      text: 'name',
      value: 'id'
    };

    // 确认项目
    const onProjectConfirm = ({ selectedOptions }: PickerOption) => {
      projectId.value = selectedOptions[0].id;
      projectName.value = selectedOptions[0].name;
      showProject.value = false;
    };

    // 菜单搜索框
    const onSearch = debounce(async () => {
      const { data } = await listProjectSelectOptions(searchVal.value);
      projectList.value = data!;
    }, 500);

    onBeforeMount(onSearch);

    return () => (
      <>
        <Field
          required={props.required}
          v-model={projectName.value}
          is-link
          readonly
          label="项目名称"
          placeholder="请选择项目名称"
          onClick={() => (showProject.value = true)}
          rules={props.rules}
        />
        <Popup v-model:show={showProject.value} position="bottom">
          <Picker
            v-model={picked.value}
            columns={projectList.value}
            columns-field-names={columnsFieldNames}
            teleport="body"
            onConfirm={(e: PickerOption) => onProjectConfirm(e)}
            onCancel={() => {
              showProject.value = false;
            }}
          >
            {{
              title: () => (
                <Search
                  v-model={searchVal.value}
                  placeholder="请输入项目名称"
                  left-icon="''"
                  show-action-button
                  onClick={withModifiers(() => {}, ['stop'])}
                  onUpdate:modelValue={() => onSearch()}
                />
              )
            }}
          </Picker>
        </Popup>
      </>
    );
  }
});
