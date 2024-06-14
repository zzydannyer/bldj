import App from '@/App.vue'
import setupStore from '@/store'
import setupRouter from '@/router'
import setupDirectives from '@/directives'
import setupComponents from '@/components'
import setupPlugins from '@/plugins'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import '@/styles/index.scss'
// 桌面端适配
import '@vant/touch-emulator'

const app = createApp(App)

// 注册路由
setupRouter(app)
// 注册状态管理
setupStore(app)
// 注册全局指令
setupDirectives(app)
// 注册全局组件
setupComponents(app)
// 注册全局方法
setupPlugins(app)

app.mount('#app')
