import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist']
  },
  // JS推荐配置
  eslint.configs.recommended,
  // TS推荐配置
  ...tseslint.configs.recommended,
  // 代码风格
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'prettier/prettier': 'error',

      // 导入规则
      'import/first': 'error', // 确保所有导入出现在其他语句之前
      'import/no-duplicates': 'error',
      'import/order': 'error' // 导入排序
    }
  }
)
