import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,                   // 引入基本的 ESLint 规则
      ...tseslint.configs.recommended,          // 启用 TypeScript 推荐规则
      ...tseslint.configs.recommendedTypeChecked,  // 启用类型检查规则
      ...tseslint.configs.strictTypeChecked,    // 更严格的类型检查规则
    ],
    files: ['**/*.{ts,tsx}'],                  // 针对 TypeScript 和 TSX 文件
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],  // 这里需要指定 TS 配置文件
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,   // React Hooks 推荐规则
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },  // 允许常量导出
      ],
      // 禁用 @typescript-eslint/no-confusing-void-expression 规则
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-explicit-any':'off'
      // 你可以根据需要添加更多自定义规则
    },
  },
)
