// https://github.com/danmactough/node-feedparser
const fs = require('fs')
const FeedParser = require('feedparser')
const fetch = require('node-fetch')
const config = require('./config')

const feedparser = new FeedParser()

if (!fs.existsSync('build')) {
  fs.mkdirSync('build')
}

console.log(`Fetching ${config.feedLink}`)

const items = []
fetch(config.feedLink)
  .then(res => res.body)
  .then(stream => stream.pipe(feedparser))
  .catch(err => console.error(err))

feedparser.on('error', function(err) {
  console.error(err)
  process.exit(1)
})

feedparser.on('readable', function() {
  const stream = this // `this` is `feedparser`, which is a stream
  // const meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
  let item
  while ((item = stream.read())) {
    items.push(item)
  }
})

feedparser.on('end', function() {
  const feedStr = JSON.stringify(items, undefined, 2)
  fs.writeFileSync('build/feed.json', feedStr)
  const dataStr = JSON.stringify(parserData(items), undefined, 2)
  fs.writeFileSync('build/data.json', dataStr)
  console.log('Feed Success!')
})

/**
 * @param {import('FeedParser').Item[]} items
 */
function parserData(items) {
  return items.map(({ title, description, date, author }) => {
    const regex = /(?<=^<p>‎<span dir="auto"><span class="autocomment">).*?(?=<\/span><\/span><\/p>)/.exec(
      description,
    )
    return {
      plainlink: title,
      remark: regex && regex[0].length <= 10 ? regex[0] : '',
      date: date.toLocaleDateString(),
      contributor: author,
    }
  })
}
