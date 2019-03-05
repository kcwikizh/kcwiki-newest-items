require('@babel/register')

const fs = require('fs')
const React = require('react')
// https://reactjs.org/docs/react-dom-server.html
const ReactDOMServer = require('react-dom/server')
const beautify = require('js-beautify').html
const { resolvePath } = require('./utils')
const config = require('./config')
const App = require(resolvePath('src/index')).default
const items = require(resolvePath('build/data.json'))
const data = { items, more: config.moreLink }

const appStr = ReactDOMServer.renderToStaticMarkup(React.createElement(App, data))

if (!fs.existsSync('build')) {
  fs.mkdirSync('build')
}

fs.writeFileSync('build/index.html', appStr)

const appStrFormat = beautify(appStr, { indent_size: 2 })
fs.writeFileSync('build/index.formatted.html', appStrFormat)

console.log('Build Success!')
