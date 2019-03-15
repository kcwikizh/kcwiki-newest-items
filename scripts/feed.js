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
  return title && config.filterTitle.test(title)
}

/**
 * parse summary from mediawiki rss description
 * @param {string} description rss description
 */
function getSummary(description) {
  const regex = /(?<=^<p>).*?(?=<\/p>)/.exec(description) // get summary
  return regex
    ? regex[0]
        .replace(/\u200e/g, '') // remove invisible char
        .replace(/<span class="autocomment">.*?<\/span>/, '') // remove autocomment
        .replace(/<span .*?>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/\/\*.*?\*\//g, '') // remove comment   /* comment */
        .trim()
    : undefined
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
    .map(({ title, description, date, author }) => ({
      title,
      remark: getSummary(description),
      date: date.toLocaleDateString(),
      contributor: author,
    }))
    .filter(({ remark }) => !!remark && remark.length <= 15)
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
