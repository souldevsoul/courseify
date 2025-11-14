#!/bin/bash

# Mass style fix for Coursify - Remove brutalist green/black styling

FILES=(
  "app/auth/error/page.tsx"
  "app/demo/page.tsx"
  "app/payment-policy/page.tsx"
  "app/blog/page.tsx"
  "app/terms/page.tsx"
  "app/features/page.tsx"
  "app/refund-policy/page.tsx"
  "app/cookie-policy/page.tsx"
  "app/auth/signup/page.tsx"
  "app/privacy/page.tsx"
  "app/contact/page.tsx"
  "app/delivery-policy/page.tsx"
  "app/cancellation-policy/page.tsx"
)

for file in "${FILES[@]}"; do
  echo "Fixing $file..."

  # Replace green-400 with purple-500/pink-500
  sed -i '' 's/text-green-400/text-purple-500/g' "$file"
  sed -i '' 's/bg-green-400/bg-purple-500/g' "$file"
  sed -i '' 's/hover:text-green-400/hover:text-pink-500/g' "$file"
  sed -i '' 's/hover:bg-green-400/hover:bg-pink-500/g' "$file"
  sed -i '' 's/border-green-400/border-purple-500/g' "$file"
  sed -i '' 's/ring-green-400/ring-purple-400/g' "$file"

  # Replace brutalist borders
  sed -i '' 's/border-4 border-black/border-2 border-purple-200 rounded-xl/g' "$file"
  sed -i '' 's/border-8 border-black/border-2 border-purple-200/g' "$file"
  sed -i '' 's/border-t-4 border-black/border-t-2 border-purple-200/g' "$file"
  sed -i '' 's/border-b-4 border-black/border-b-2 border-purple-200/g' "$file"

  # Replace brutalist shadows
  sed -i '' 's/brutalist-shadow-yellow/shadow-lg/g' "$file"
  sed -i '' 's/brutalist-shadow/shadow-lg/g' "$file"

  echo "  ✓ Fixed $file"
done

echo ""
echo "✅ All styling fixes applied!"
