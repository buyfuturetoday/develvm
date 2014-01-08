#!/bin/bash

source setenv

# Delete database, in case it already exists
CMD="curl -X DELETE ${COUCHDB1}/test/"
echo $CMD
time $CMD

# Create database
CMD="curl -X PUT ${COUCHDB1}/test/"
echo $CMD
time $CMD

# Show database info
CMD="curl -X GET ${COUCHDB1}/test/"
echo $CMD
time $CMD

# Store empty document
CMD="curl -X POST -H Content-Type:application/json -d {} ${COUCHDB1}/test/"
echo $CMD
time $CMD

# List all documents
CMD="curl -X GET ${COUCHDB1}/test/_all_docs"
echo $CMD
time $CMD
