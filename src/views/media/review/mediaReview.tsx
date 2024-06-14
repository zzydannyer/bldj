import { PropType, Transition, withModifiers } from 'vue'
import {
  Button,
  Image,
  Dialog,
  Field,
  NumberKeyboard,
  Loading,
  CheckboxGroup,
  Checkbox,
  Picker,
  Popup,
  Overlay,
  PickerOption,
} from 'vant'
import { MediaMain } from '@/types/media'
import { Icon } from '@iconify/vue'
import VPreview from '@/components/VPreview/index.vue'
import VideoClip from '@/components/VideoClip/index.vue'
import './mediaReview.scss'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'image' | 'video'>,
      default: 'image',
    },
    mediaList: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    mediaSubmit:{
      type:String,
      default:''
    }
  },
  setup(props, { attrs, slots, emit }) {
    const router = useRouter()
    const showPreview = ref<boolean>(false)
    const showChangeName = ref<boolean>(false)
    const showVideoClip = ref<boolean>(false)
    const mediaIndex = ref<number>(-1)
    const mediaName = ref<string>('')
    const checked = ref<string[]>([])
    const scorevalue= [
      { label: "1分", value: 1 },
      { label: "2分", value: 2 },
      { label: "3分", value: 3 },
      { label: "4分", value: 4 },
      { label: "5分", value: 5 },
      { label: "6分", value: 6 },
      { label: "7分", value: 7 },
      { label: "8分", value: 8 },
      { label: "9分", value: 9 },
      { label: "10分", value: 10 }
    ]
    const fileIndex = ref(0);
    const showPicker = ref(false);
    // 点击文件事件
    function flieClick(index:number){
      fileIndex.value=index
      showPicker.value = true
    }
    // 取消选择框
    function onCancel(){
      showPicker.value = false
    } 
    // 确认选择框
    function onChange({selectedOptions}:PickerOption) {
      emit('updateScore', selectedOptions[0],fileIndex.value);
      showPicker.value = false;
    }

    /**
     * 裁剪视频
     */
    const curVideo = ref<MediaMain>()
    const VideoClipRef = ref()
    async function handleVideoClip(curMedia: any) {

      showVideoClip.value = true
      curVideo.value = curMedia
      await nextTick()
      VideoClipRef.value.init()
      // router.push({name: 'MediaClip'})
    }

    // 点击图片
    function handleMediaClick(media: any, index: number) {
      mediaIndex.value = index
      showPreview.value = true
    }

    // 点击文件名
    function handleNameClick(index: number) {
      mediaName.value = props.mediaList[index].resourceName
      mediaIndex.value = index
      showChangeName.value = true
    }

    // 确认修改文件名
    function handleConfirm() {
      emit('nameChange', mediaName.value, mediaIndex.value)
      showChangeName.value = false
    }

    // 选中图片
    function handleCheckedChange() {
      emit('checkedChange', checked.value)
    }
   
    // 裁剪后更新视频
    function handleUpdateVideo(
      id: string,
      data: {
        url: string
        ossId: number
      }
    ) {
      emit('updateVideo', id, data.url, data.ossId)
      showVideoClip.value = false
    }

    return () => (
      <>
        <CheckboxGroup v-model={checked.value} onChange={handleCheckedChange}>
          {props.mediaList.map((media, index) => (
            <>
              <div class="media-container">
               
                <Image
                  class="w-full h-full"
                  fit="contain"
                  src={props.type === 'image' ? media.url : media.thumbnailUrl}
                  onClick={() => handleMediaClick(media, index)}
                >
                  {{
                    loading: () => <Loading type="spinner" size="20" />,
                    error: () => <span>加载失败</span>,
                  }}
                </Image>

                <Checkbox class="review-check" name={media.id}>
                  {{
                    icon: ({ checked }: { checked: boolean }) => (
                      <>
                        <div
                          class={
                            checked ? 'review-checked' : 'review-unchecked'
                          }
                        />
                        <Icon
                          class="absolute left-0 top-0"
                          icon="radix-icons:check"
                          color="white"
                        />
                      </>
                    ),
                  }}
                </Checkbox>

                <div class="company-pass" v-show={media.companyAudit === '1' && media.mediaStatus === '5'}>
                  PASS
                </div>
                <div
                  class="preview-cover van-ellipsis"
                  onClick={withModifiers(
                    () => handleNameClick(index),
                    ['stop']
                  )}
                >
                  <Icon icon="mingcute:edit-line" />
                  {media.resourceName}
                </div>
                {/* 分值选择 */}
                
                <Field
                   v-model={media.scoreLabel}
                   is-link
                   readonly
                   v-show={props.mediaSubmit === '5'}
                   style={{ padding:'inherit !important'}}
                   placeholder="选择分值"
                   onClick={() => flieClick(index)}
                />
                <Button
                  v-show={props.type === 'video'}
                  class="w-32"
                  plain
                  hairline
                  size="mini"
                  type="primary"
                  onClick={() => handleVideoClip(media)}
                >
                  裁剪
                </Button>
              </div>
            </>
          ))}
        </CheckboxGroup>

        <Popup v-model:show={showPicker.value} round position="bottom">
          <Picker
            columns={scorevalue}
            onCancel={onCancel}
            onConfirm={onChange}
            columns-field-names={ {text: 'label', value: 'value'}}
          />
        </Popup>

        {/* 预览 */}
        <VPreview
          v-model={showPreview.value}
          type={props.type}
          list={props.mediaList}
          mediaIndex={mediaIndex.value}
        />

        {/* 改名 */}
        <Dialog
          v-model:show={showChangeName.value}
          title="修改素材名称"
          show-cancel-button
          teleport="body"
          onConfirm={handleConfirm}
        >
          <Field
            class="py-8"
            v-model={mediaName.value}
            input-align="center"
            placeholder="请输入文件名"
          />
        </Dialog>

        {/* 裁剪 */}
        <Transition name="van-fade">
          {showVideoClip.value && (
            <setction
              style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                zIndex: 10,
                background: 'rgba(0,0,0,0.9)',
              }}
            >
              <div class="h-screen flex flex-col justify-center items-stretch">
                <VideoClip
                  ref={VideoClipRef}
                  media={curVideo.value}
                  onUpdateVideo={handleUpdateVideo}
                  onCancel={() => (showVideoClip.value = false)}
                />
              </div>
            </setction>
          )}
        </Transition>

        <NumberKeyboard safe-area-inset-bottom />
      </>
    )
  },
})
