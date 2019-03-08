const path = require('path')

exports.resolvePath = function(dir = '') {
  return path.join(__dirname, '..', dir)
}

exports.parseFeed = function(url) {
  const fetch = require('node-fetch')
  // https://github.com/danmactough/node-feedparser
  const FeedParser = require('feedparser')
  const feedparser = new FeedParser()
  return fetch(url)
    .then(res => res.body)
    .then(stream => stream.pipe(feedparser))
    .then(
      () =>
        new Promise((resolve, reject) => {
          const items = []
          feedparser.on('readable', function() {
            const stream = this
            let item
            while ((item = stream.read())) {
              items.push(item)
            }
          })
          feedparser.on('error', err => {
            reject(err)
          })
          feedparser.on('end', () => {
            resolve(items)
          })
        }),
    )
}
