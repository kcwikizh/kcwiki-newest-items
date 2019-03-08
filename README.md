# Kcwiki Newest Items

[![Build Status](https://travis-ci.org/kcwikizh/kcwiki-newest-items.svg?branch=master)](https://travis-ci.org/kcwikizh/kcwiki-newest-items)

## Introduction

Automatically update The Latest Items Template based on rss.

## Usages

```bash
# install dependencies
npm install

# get data from the configured URL
npm run feed

# generate html based on data
npm run build

# deploy html to wiki page
# require environment variables USERNAME and PASSWORD
npm run deploy

# clean build cache
npm run clean
```

## Configuration

See `scripts/config` for more details.

## Dependencies

- [React](https://reactjs.org/)
- [feedparser](https://github.com/danmactough/node-feedparser)
- [nodemw](https://github.com/macbre/nodemw)
- etc.

## License

[The MIT License](https://github.com/kcwikizh/kcwiki-newest-items/blob/master/LICENSE)
