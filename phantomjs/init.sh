#!/bin/bash
echo "Need something like version 1.9.2 of PhantomJS"
echo "phantomjs --version"
phantomjs --version

echo "Need Python 2.6 or greater"
echo "python --version"
python --version

read -p "Press [Enter] key to start or ctrl-C to cancel..."

npm install casperjs

echo "./node_modules/.bin/casperjs --version"
./node_modules/.bin/casperjs --version
