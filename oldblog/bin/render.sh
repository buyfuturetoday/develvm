#!/usr/bin/env bash

rm    -rf blog/public

node_modules/.bin/blacksmith blog

#mkdir     blog/public/css
#cp    -r  assets/css/*       blog/public/css

mkdir     blog/public/assets
cp    -r  assets/bootstrap/*        blog/public/assets
cp        assets/css/bs-styles.css  blog/public/assets/css


git add blog
git commit -am "Rendered site..."
