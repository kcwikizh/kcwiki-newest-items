// https://github.com/danmactough/node-feedparser
const fs = require('fs')
const config = require('./config')
const { resolvePath, parseFeed } = require('./utils')

const { LOCAL } = process.env

/**
 * @param {import('FeedParser').Item[]} items
 */
function parseData(items) {
  return items
    .map(({ title, description, date, author }) => {
      const regex = /(?<=^<p>‎<span dir="auto"><span class="autocomment">).*?(?=<\/span><\/span><\/p>)/.exec(
        description,
      )
      return {
        plainlink: title,
        remark: regex ? regex[0] : undefined,
        date: date.toLocaleDateString(),
        contributor: author,
      }
    })
    .filter(({ remark }) => remark && remark.length <= 10)
}

async function main() {
  if (!fs.existsSync('build')) {
    fs.mkdirSync('build')
  }
  let items
  if (LOCAL) {
    console.log('Using Local Mode.')
    items = require(resolvePath('build/feed.json')).map(({ date, ...rest }) => ({
      date: new Date(date), // parse date
      ...rest,
    }))
  } else {
    console.log(`Fetching ${config.feedLink}`)
    items = await parseFeed(config.feedLink)
    fs.writeFileSync('build/feed.json', JSON.stringify(items, undefined, 2))
  }

  fs.writeFileSync('build/data.json', JSON.stringify(parseData(items), undefined, 2))
  console.log('Feed Success!')
}

main()
