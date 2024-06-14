import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline'

// Iconify Icon在Vue里本地使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: 'IconifyIconOffline',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    if (typeof this.icon === 'object') addIcon(this.icon, this.icon)
    const attrs = this.$attrs
    const style = attrs?.style
      ? Object.assign(attrs.style, { outline: 'none' })
      : { outline: 'none' }
    return h(
      IconifyIcon,
      {
        icon: this.icon,
        style,
        ...attrs,
      },
      {
        default: () => [],
      }
    )
  },
})
