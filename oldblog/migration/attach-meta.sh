#!/usr/bin/env bash

rm output/*
cd input
for f in *.md; do 
  export FILENAME=$f
  echo "Processing $f file...($FILENAME)"; 
  cat ../post-meta.txt $f > ../output/$f

  sed -i .bak "s/HEY A TITLE/$FILENAME/g" ../output/$f
done

rm ../output/*.bak
