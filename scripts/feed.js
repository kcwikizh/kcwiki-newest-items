// https://github.com/danmactough/node-feedparser
const fs = require('fs')
const FeedParser = require('feedparser')
const fetch = require('node-fetch')
const config = require('./config')
const { resolvePath } = require('./utils')

const { LOCAL } = process.env
const feedparser = new FeedParser()

if (!fs.existsSync('build')) {
  fs.mkdirSync('build')
}

if (LOCAL) {
  console.log('Using Local Mode.')
  if (!fs.existsSync('build/feed.json')) {
    console.error("ERROR! file 'build/feed.json' not exist")
    process.exit(1)
  }
  const items = require(resolvePath('build/feed.json')).map(({ date, ...rest }) => ({
    date: new Date(date), // parse date
    ...rest,
  }))
  const dataStr = JSON.stringify(parseData(items), undefined, 2)
  fs.writeFileSync('build/data.json', dataStr)
  console.log('Feed Success!')
  process.exit(0)
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
  const dataStr = JSON.stringify(parseData(items), undefined, 2)
  fs.writeFileSync('build/data.json', dataStr)
  console.log('Feed Success!')
})

/**
 * @param {import('FeedParser').Item[]} items
 */
function parseData(items) {
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
