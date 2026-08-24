import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  typescript: true,
  ignores: ['content/**'],
}, {
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
    'node/prefer-global/process': 'off',
  },
})
