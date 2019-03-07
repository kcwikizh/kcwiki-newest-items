const fs = require('fs')
// https://github.com/macbre/nodemw
const Bot = require('nodemw')
const config = require('./config')

const bot = new Bot(config.bot)

const content = fs.readFileSync('build/index.html', { encoding: 'utf-8' })

if (!content) {
  console.error('Not Content! Deploy ERROR!')
  process.exit(1)
}

const { deployTitle: title, summary } = config
// bot.getArticle(title, (err, data) => console.log(err, data))
const minor = true
bot.edit(title, content, summary, minor, (err, data) => {
  if (err) {
    console.error(err)
    console.log('Deploy ERROR!')
    return
  }
  console.log(data)
  console.log('Deploy Success!')
})
