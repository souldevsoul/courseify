import tsParser from '@typescript-eslint/parser';
import productQuality from './eslint-plugin-product-quality/index.js';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } } },
    plugins: { 'product-quality': productQuality },
    rules: {
      'product-quality/no-broken-internal-links': 'warn',
      'product-quality/use-styleguide-colors-only': ['warn', {
        allowedColors: ['black', 'white', 'transparent', 'current', 'inherit', 'gray-', 'slate-', 'zinc-', 'neutral-', 'blue-', 'cyan-', 'teal-', 'green-', 'emerald-', 'red-']
      }],
      'product-quality/consistent-payment-providers': ['warn', { provider: 'stripe' }],
      'product-quality/consistent-company-info': ['warn', { companyName: 'Courseify', email: 'support@courseify.ai' }],
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-form-without-submit': 'error',
      'product-quality/no-missing-alt-text': 'error',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
