#!/bin/bash

if [[ -f "{$CWD}/src/blog/{$1}"]]; then
  echo "File already exists"
  exit 1
fi

echo "Making post in {$CWD}/src/blog/{$1}"
echo "Press any key to continue..."
read

mkdir "{$CWD}/src/blog/{$1}"
touch "{$CWD}/src/blog/{$1}/post.mdx"

echo "Created {$CWD}/src/blog/{$1}/post.mdx"

cp "{$CWD}/templates/post-template.tsx" "{$CWD}/src/blog/{$1}/page.tsx"
sed -i "s/\$POST_TITLE/{$1}/g" "{$CWD}/src/blog/{$1}/page.tsx"

echo "Created {$CWD}/src/blog/{$1}/page.tsx"
