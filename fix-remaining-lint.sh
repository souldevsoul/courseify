#!/bin/bash

# Fix unescaped apostrophes and quotes in specific files

# app/about/page.tsx
sed -i '' "s/We're on a mission/We\&apos;re on a mission/g" app/about/page.tsx
sed -i '' "s/we're committed/we\&apos;re committed/g" app/about/page.tsx
sed -i '' "s/we're building/we\&apos;re building/g" app/about/page.tsx

# app/cancellation-policy/page.tsx
sed -i '' 's/Click "Cancel Subscription"/Click \&quot;Cancel Subscription\&quot;/g' app/cancellation-policy/page.tsx
sed -i '' 's/Subject line: "Cancel Subscription"/Subject line: \&quot;Cancel Subscription\&quot;/g' app/cancellation-policy/page.tsx
sed -i '' "s/We'll process/We\&apos;ll process/g" app/cancellation-policy/page.tsx
sed -i '' "s/Before canceling, let us/Before canceling, let us/g" app/cancellation-policy/page.tsx

# app/contact/page.tsx
sed -i '' "s/We'd love to hear/We\&apos;d love to hear/g" app/contact/page.tsx
sed -i '' "s/We'll get back/We\&apos;ll get back/g" app/contact/page.tsx
sed -i '' "s/You'll receive/You\&apos;ll receive/g" app/contact/page.tsx

# app/cookie-policy/page.tsx
sed -i '' 's/clicking "Accept"/clicking \&quot;Accept\&quot;/g' app/cookie-policy/page.tsx
sed -i '' 's/click "Manage Preferences"/click \&quot;Manage Preferences\&quot;/g' app/cookie-policy/page.tsx

# app/delivery-policy/page.tsx
sed -i '' "s/account's email address/account\&apos;s email address/g" app/delivery-policy/page.tsx

# app/features/page.tsx
sed -i '' "s/Let's create something/Let\&apos;s create something/g" app/features/page.tsx

echo "Fixed unescaped quotes and apostrophes"
