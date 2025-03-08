import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: true,
    javascript: true,
    vue: true,
    ignores: ['public/**/*'],
  },
  {
    rules: {
      'curly': 0,
      'no-console': 0,
      'no-alert': 0,
      'antfu/if-newline': 0,
      'vue/html-self-closing': [1, { html: { void: 'always' } }],
      'node/prefer-global/process': 0,
      'style/brace-style': [2, '1tbs'],
    },
  },
)
