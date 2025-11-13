import tsParser from '@typescript-eslint/parser';

import productQuality from './eslint-plugin-product-quality/index.js';

/**
 * Product Quality ESLint Config for Courseify
 * Flat config format (ESLint 9+) with TypeScript support
 *
 * Enforces Courseify brand standards (see BRAND_GUIDE.md):
 * - blue/emerald/violet color palette (educational, growth, creative theme)
 * - Company name: Courseify (Title Case)
 * - Email: support@courseify.ai (single contact point)
 * - Payment provider: stripe
 * - Border radius: 12px+ (smooth, modern corners)
 * - Shadows: soft professional (no brutalist)
 * - Typography: Title Case (no UPPERCASE)
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
        companyName: 'Courseify',
        email: 'support@courseify.ai',
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
          // Courseify brand (blue/emerald/violet)
          'blue-', 'emerald-', 'violet-',
          // Semantic
          'red-', // Errors only
        ],
      }],

      // ========================================
      // TEMPLATE ADAPTATION (CRITICAL - BLOCKS BUILD)
      // ========================================
      'product-quality/no-template-content': ['error', {
        projectName: 'Courseify',
        forbiddenWords: [
          'voice', 'Voice', 'audio', 'Audio',
          'logo', 'Logo', 'LogoSmith', 'logosmith',
          'pet', 'Pet', 'PetPortrait', 'petportrait',
          'clip', 'Clip', 'ClipMaster', 'clipmaster',
          'VoiceCraft', 'voicecraft',
          'microphone', 'Microphone', 'waveform', 'Waveform',
        ],
      }],

      'product-quality/no-fake-statistics': 'error',

      'product-quality/require-consistent-layout': ['error', {
        marketingPages: ['/', '/features', '/pricing', '/about', '/contact', '/blog'],
      }],

      'product-quality/require-policy-content': ['error', {
        minimumLength: 500,
      }],

      'product-quality/require-auth-ui-in-dashboard': 'error',

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
