all: static/bundle.js static/example.js

static/bundle.js: scatter.js
	./node_modules/.bin/browserify $< -o $@

static/example.js: scatter_example.js
	./node_modules/.bin/browserify $< -o $@
