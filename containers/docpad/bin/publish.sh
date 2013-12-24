#!/usr/bin/env bash

./bin/render.sh

git add src
git commit -am "Updated blog"
git push origin master
git push heroku master

