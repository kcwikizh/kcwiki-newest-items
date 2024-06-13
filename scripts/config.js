// common
const protocol = 'https'
const server = 'zh.kcwiki.cn'
const apiUrl = `${protocol}://${server}/api.php` // mediawiki api page
// feed
const feedLink = `${apiUrl}?hidebots=1&hideminor=1&action=feedrecentchanges&feedformat=atom` // the rss url
const augroup = 'kcwikiEditer' // author whitelist group
const queryUserGroupUrl = `${apiUrl}?action=query&format=json&list=allusers&augroup=${augroup}`
const limit = 5 // item limit
const filterTitle = /^(?!.*?(File|User|Template|css|MediaWiki|模块|创建空白页面)).*$/ // the regex for filter useless update
// build
const moreLink = `${protocol}://${server}/wiki/Special:%E6%9C%80%E8%BF%91%E6%9B%B4%E6%94%B9`
// deploy
const deployTitle = `Template:最新词条/2` // title of the page to edit
const summary = 'Update from https://github.com/kcwikizh/kcwiki-newest-items/' // edit summary when deploy

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
