#!/bin/bash

if [[ -f "${PWD}/src/blog/$1" ]]; then
	echo "File already exists"
	exit 1
fi

echo "Making post in ${PWD}/src/app/blog/$1"
echo "Press any key to continue..."
read

mkdir "${PWD}/src/app/blog/$1"
touch "${PWD}/src/app/blog/$1/post.mdx"

echo "Created ${PWD}/src/app/blog/$1/post.mdx"

cp "${PWD}/templates/post-template.tsx" "${PWD}/src/app/blog/$1/page.tsx"
sed -i "s/\$POST_TITLE/$1/g" "${PWD}/src/app/blog/$1/page.tsx"

echo "Created ${PWD}/src/app/blog/$1/page.tsx"
