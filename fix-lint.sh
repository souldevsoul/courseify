#!/bin/bash

# Fix unescaped quotes and apostrophes
find app components -type f -name "*.tsx" -exec sed -i '' "s/couldn't/couldn\\'t/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/world's/world\\'s/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/you're/you\\'re/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/we're/we\\'re/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/don't/don\\'t/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/won't/won\\'t/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/can't/can\\'t/g" {} \;
find app components -type f -name "*.tsx" -exec sed -i '' "s/isn't/isn\\'t/g" {} \;

echo "Fixed common apostrophes"
