#!/usr/bin/env bash

./bin/render.sh

git push origin master
git push heroku master

