#!/bin/bash

source setenv

CMD="curl -X PUT ${COUCHDB1}/test/"
echo $CMD
$CMD

CMD="curl -X GET ${COUCHDB1}/test/"
echo $CMD
$CMD
