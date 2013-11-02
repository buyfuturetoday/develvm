#
#
#

BIN = ./node_modules/.bin

SRC = $(wildcard src/*.js)
BUILD = $(SRC:src/%.js=build)

DOCSRC = $(wildcard *.js)
DOC = $(DOCSRC:%.js=docs/%.html)

all: install build run

#build:	./src/build.js
build: $(BUILD)
	git pull
	grunt

doc: $(DOC)

docs/%.html: %.js
	./node_modules/.bin/doccoh ./src/*.js

# Removed dependency on build since it takes too long, do make build manually when needed
# test: build
test:	build
	grunt nodeunit

clean:
	@rm -f ./build/*
	@rm -f ./docs/*
	@rm -rf ./node_modules

install link: package.json
	@npm $@

run:
	node ./src/app.js list


.PHONY: build
.PHONY: test
.PHONY: doc
