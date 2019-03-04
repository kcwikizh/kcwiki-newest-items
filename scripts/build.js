require('@babel/register')

const fs = require('fs')
const React = require('react')
// https://reactjs.org/docs/react-dom-server.html
const ReactDOMServer = require('react-dom/server')
const beautify = require('js-beautify').html
const App = require('../src/index').default
const data = require('../build/data.json')

const appStr = ReactDOMServer.renderToStaticMarkup(React.createElement(App, data))

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

fs.writeFileSync('dist/index.html', appStr)

const appStrFormat = beautify(appStr, { indent_size: 2 })
fs.writeFileSync('dist/index.formatted.html', appStrFormat)

console.log('Build Success!')
