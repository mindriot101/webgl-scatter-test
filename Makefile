recompile: static/scatter.js static/scatter_example.js

watch:
	when-changed src/scatter.js src/scatter_example.js -c make recompile

server:
	python ./server.py

static/%.js: src/%.js
	./node_modules/.bin/browserify $< -o $@

.PHONY: watch server
