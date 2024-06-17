import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import { viteVConsole } from 'vite-plugin-vconsole';

const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    root: './',
    base: '/',
    // define: {
    //   'process.env': env,
    // },
    resolve: {
      alias: {
        // 设置路径
        '~': pathResolve('./'),
        // 设置别名
        '@': pathResolve('./src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true // 解构 props
        },
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              const customTags = ['swiper-container', 'swiper-slide'];
              return customTags.includes(tag);
            }
          }
        }
      }),
      // jsx、tsx语法支持
      vueJsx(),
      createHtmlPlugin(),
      Components({
        resolvers: [IconsResolver(), VantResolver()],
        dts: './types/components.d.ts'
      }),
      Icons({ autoInstall: true }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: './types/auto-import.d.ts',
        eslintrc: {
          enabled: true
        },
        resolvers: []
      }),
      viteVConsole({
        entry: resolve('src/main.ts'), // 入口文件
        localEnabled: env.VITE_BUILD_VCONSOLE === 'true', // 本地是否启用
        enabled: env.VITE_BUILD_VCONSOLE === 'true', // 是否启用
        config: {
          maxLogNumber: 100, // 日志最大数量
          theme: 'dark', // 主题颜色
          onReady() {
            this.setSwitchPosition(9999, 0);
          }
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use './src/styles/global.scss' as *;@import './src/styles/mixins.scss';"
        }
      }
    },
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8087',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },
    build: {
      rollupOptions: {
        input: 'index.html'
      },
      outDir: 'dist',
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true // 去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    }
  });
};
