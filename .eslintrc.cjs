/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    module: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-essential', // Vue 3 相关的基本规则
    'eslint:recommended', // 推荐的 ESLint 规则
    '@vue/eslint-config-typescript', // TypeScript 相关规则
    'plugin:prettier/recommended' // 结合 Prettier 的配置，避免冲突
  ],
  parserOptions: {
    ecmaVersion: 'latest' // 使用最新的 ECMAScript 版本
  },
  rules: {
    // 关闭 Vue 组件名称必须为多词规则
    'vue/multi-word-component-names': 'off',
    // 关闭 TypeScript 未使用变量的检查
    '@typescript-eslint/no-unused-vars': 'off',

    // 添加 Vue 属性排序规则，启用按字母顺序排序
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION', // 定义类属性 (is, v-is)
          'LIST_RENDERING', // 列表渲染 (v-for item in items)
          'CONDITIONALS', // 条件渲染 (v-if, v-else-if, v-else, v-show, v-cloak)
          'RENDER_MODIFIERS', // 渲染方式 (v-once, v-pre)
          'GLOBAL', // 全局指令/属性 (id)
          'UNIQUE', // 唯一属性 (ref, key, slot)
          'TWO_WAY_BINDING', // 双向绑定 (v-model)
          'OTHER_DIRECTIVES', // 其他指令 (v-custom-directive)
          'OTHER_ATTR', // 其他属性
          'EVENTS', // 事件监听器 (v-on, @click)
          'CONTENT' // 内容 (v-text, v-html)
        ],
        alphabetical: true // 按字母顺序排序属性
      }
    ],
    // 启用 Prettier 规则
    'prettier/prettier': 'error'
  }
};
