.PHONY: docs example

docs:
	npm install --prefix PuppeteerMousePlayback && npm run --prefix PuppeteerMousePlayback docs

example:
	node PuppeteerMousePlayback/example.js
