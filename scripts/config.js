const protocol = 'https'
const server = 'zh.kcwiki.org'
const moreLink = `${protocol}://${server}/wiki/Special:%E6%9C%80%E8%BF%91%E6%9B%B4%E6%94%B9`
const feedLink = `${protocol}://${server}/api.php?hidebots=1&urlversion=1&days=7&limit=50&action=feedrecentchanges&feedformat=atom`

module.exports = {
  protocol,
  server,
  moreLink,
  feedLink,
}
