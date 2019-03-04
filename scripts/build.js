require('@babel/register')

const fs = require('fs')
const React = require('react')
// https://reactjs.org/docs/react-dom-server.html
const ReactDOMServer = require('react-dom/server')
const beautify = require('js-beautify').html
const utils = require('./utils')
const config = require('./config')
const App = require(utils.resolvePath('src/index')).default
const items = require(utils.resolvePath('build/data.json'))
const data = { items, more: config.moreLink }

const appStr = ReactDOMServer.renderToStaticMarkup(React.createElement(App, data))

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

fs.writeFileSync('dist/index.html', appStr)

const appStrFormat = beautify(appStr, { indent_size: 2 })
fs.writeFileSync('dist/index.formatted.html', appStrFormat)

console.log('Build Success!')
