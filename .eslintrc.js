module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-essential',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    sourceTYpe: 'module',
    ecmaVersion: 6,
    env: { es6: true }
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/no-deprecated-slot-attribute': 'off'
  }
}
