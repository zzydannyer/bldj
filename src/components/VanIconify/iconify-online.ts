import { Icon as IconifyIcon } from '@iconify/vue';

// Iconify Icon在Vue里在线使用（用于外网环境）
export default defineComponent({
  name: 'IconifyIconOnline',
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render() {
    const attrs = this.$attrs;
    const style = attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' };
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style,
        ...attrs
      },
      {
        default: () => []
      }
    );
  }
});
