const fs = require('fs')
const fetch = require('node-fetch')
const config = require('./config')
const { resolvePath, parseFeed } = require('./utils')

const { LOCAL } = process.env

async function queryUserList(url) {
  const resp = await fetch(url)
  const json = await resp.json()
  // https://www.mediawiki.org/wiki/Special:MyLanguage/API:Allusers
  return json['query']['allusers'].map(({ name }) => name)
}

function filterAuthor(userList) {
  const set = new Set(userList)
  return ({ contributor }) => set.has(contributor)
}

function filterTitle({ title }) {
  return config.filterTitle.test(title)
}

/**
 * @param {import('FeedParser').Item[]} items
 */
async function parseData(items) {
  let userList
  if (LOCAL) {
    console.log('Using Local User List')
    userList = require(resolvePath('build/users.json'))
  } else {
    console.log('Fetching User List')
    userList = await queryUserList(config.queryUserGroupUrl)
    fs.writeFileSync('build/users.json', JSON.stringify(userList, undefined, 2))
  }
  return items
    .map(({ title, description, date, author }) => {
      const regex = /(?<=^<p>‎<span dir="auto"><span class="autocomment">).*?(?=<\/span><\/span><\/p>)/.exec(
        description,
      )
      return {
        title,
        remark: regex ? regex[0] : undefined,
        date: date.toLocaleDateString(),
        contributor: author,
      }
    })
    .filter(({ remark }) => remark && remark.length <= 10)
    .filter(filterAuthor(userList))
    .filter(filterTitle)
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
  let data = await parseData(items)
  if (fs.existsSync('build/data.json')) {
    console.log('Use Previous Data')
    const previousData = require(resolvePath('build/data.json'))
    data = data.concat(previousData)
  }
  data = data
    .filter(({ title }, i, arr) => arr.findIndex(item => item.title === title) === i) // filter title repeat
    .slice(0, config.limit)
  fs.writeFileSync('build/data.json', JSON.stringify(data, undefined, 2))
  console.log('Feed Success!')
}

main()
