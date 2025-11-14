import tsParser from '@typescript-eslint/parser';

import productQuality from './eslint-plugin-product-quality/index.js';

/**
 * Product Quality ESLint Config for Coursify
 * Flat config format (ESLint 9+) with TypeScript support
 *
 * Enforces Coursify brand standards:
 * - purple/fuchsia/pink/rose color palette (creative, educational, inspiring theme)
 * - Company name: Coursify (Title Case)
 * - Email: support@coursify.ai (single contact point)
 * - Payment provider: stripe
 * - Border radius: 12px+ (smooth, modern corners)
 * - Shadows: soft professional
 * - Typography: Modern, clean
 */
export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      'eslint-plugin-product-quality/**',
      // Internal components with legacy naming (not user-facing)
      'components/courseify/**',
      'components/dashboard/**',
      'test-voice-cloning.ts',
      'middleware.ts',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'product-quality': productQuality,
    },
    rules: {
      // ========================================
      // PRODUCT QUALITY - CRITICAL
      // ========================================

      // Link validation - prevents 404 errors
      'product-quality/no-broken-internal-links': 'error',

      // Brand consistency - ensures correct branding
      'product-quality/consistent-company-info': ['error', {
        companyName: 'Coursify',
        email: 'support@coursify.ai',
      }],

      // Payment provider consistency
      'product-quality/consistent-payment-providers': ['error', {
        provider: 'stripe',
      }],

      // Color palette enforcement - brand visual consistency
      'product-quality/use-styleguide-colors-only': ['error', {
        allowedColors: [
          // Base
          'black', 'white', 'transparent', 'current', 'inherit',
          // Neutrals
          'slate-', 'gray-',
          // Coursify brand (purple/fuchsia/pink/rose)
          'purple-', 'fuchsia-', 'pink-', 'rose-',
          // Semantic
          'red-', // Errors only
          'green-', // Success
        ],
      }],

      // ========================================
      // TEMPLATE ADAPTATION (DISABLED - NOT IMPLEMENTED)
      // ========================================
      // TODO: Implement these rules if needed
      // 'product-quality/no-template-content': ['error', {...}],
      // 'product-quality/no-fake-statistics': 'error',
      // 'product-quality/require-consistent-layout': ['error', {...}],
      // 'product-quality/require-policy-content': ['error', {...}],
      // 'product-quality/require-auth-ui-in-dashboard': 'error',

      // ========================================
      // UX & FUNCTIONALITY
      // ========================================

      // Interactive elements must be functional
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-form-without-submit': 'error',

      // Accessibility
      'product-quality/no-missing-alt-text': 'error',

      // Content quality
      'product-quality/no-generic-placeholders': 'warn',

      // ========================================
      // PERFORMANCE & OPTIMIZATION
      // ========================================
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
