module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  endOfLine: 'lf', // 换行符使用 lf 结尾是，可选值<auto|lf|crlf|cr>
  printWidth: 80, // 一行最多多少个字符，降低这个值以强制换行属性
  tabWidth: 2, // 指定每个缩进级别的空格数
  useTabs: false, // 使用制表符而不是空格缩进行
  semi: true, // 在语句末尾打印分号
  singleQuote: true, // 使用单引号而不是双引号
  quoteProps: 'as-needed', // 更改引用对象属性的时间
  jsxSingleQuote: false, // 在JSX中使用单引号而不是双引号
  trailingComma: 'none', // 多行时尽可能打印尾随逗号
  bracketSpacing: true, // 在对象文字中的括号之间打印空格
  jsxBracketSameLine: false, // jsx 标签的反尖括号需要换行
  bracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  arrowParens: 'always', // 在单独的箭头函数参数周围包括括号
  rangeStart: 0, // 指定格式化代码的开始偏移量
  rangeEnd: Infinity, // 指定格式化代码的结束偏移量
  requirePragma: false, // 指定要使用的解析器，不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: 'preserve', // 使用默认的折行标准
  htmlWhitespaceSensitivity: 'css', // 指定HTML文件的全局空格敏感度
  vueIndentScriptAndStyle: true // Vue文件脚本和样式标签缩进
};
