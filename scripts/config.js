const protocol = 'https'
const server = 'zh.kcwiki.org'
const apiUrl = `${protocol}://${server}/api.php`
const moreLink = `${protocol}://${server}/wiki/Special:%E6%9C%80%E8%BF%91%E6%9B%B4%E6%94%B9`
const feedLink = `${apiUrl}?hidebots=1&urlversion=1&days=15&limit=100&hideminor=1&action=feedrecentchanges&feedformat=atom`
const augroup = 'kcwikiEditer' // author whitelist group
const queryUserGroupUrl = `${apiUrl}?action=query&format=json&list=allusers&augroup=${augroup}`
const deployTitle = `Template:最新词条/2` // Template:最新词条/2
const limit = 5 // item limit
const filterTitle = /^(?!.*?(File|User|Template|css|MediaWiki|模块)).*$/
const summary = 'Update'

module.exports = {
  moreLink,
  feedLink,
  queryUserGroupUrl,
  limit,
  filterTitle,
  deployTitle,
  summary,
  bot: {
    debug: process.env.DEBUG,
    protocol,
    server,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
}
