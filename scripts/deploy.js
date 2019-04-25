const fs = require('fs')
// https://github.com/macbre/nodemw
const Bot = require('nodemw')
const config = require('./config')

const bot = new Bot(config.bot)
const content = fs.readFileSync('build/index.html', { encoding: 'utf-8' })

if (!content) {
  console.error("Deploy ERROR! Empty deploy content! Please run 'npm run feed' first. ")
  process.exit(1)
}

const { username, password } = config.bot
if (!username && !password) {
  console.log('Deploy ERROR! No username or password!')
  process.exit(1)
}

console.log('Logging...')
bot.logIn(username, password, err => {
  if (err) {
    console.error('Login ERROR!', err)
    process.exit(1)
    return
  }
  console.log('Deploying...')
  const { deployTitle: title, summary } = config
  // bot.getArticle(title, (err, data) => console.log(err, data))
  const minor = true
  bot.edit(title, content, summary, minor, (err, data) => {
    if (err) {
      console.error(err)
      console.log('Deploy ERROR!')
      process.exitCode = 1
      return
    }
    console.log('Deploy Result: ', data)
    console.log('Deploy Finish!')
  })
})
