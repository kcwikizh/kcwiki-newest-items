require('@babel/register')

const fs = require('fs')
const React = require('react')
// https://reactjs.org/docs/react-dom-server.html
const ReactDOMServer = require('react-dom/server')
const App = require('../src/index').default

const appStr = ReactDOMServer.renderToStaticMarkup(React.createElement(App))

console.log(appStr)

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

fs.writeFileSync('dist/index.js', appStr)
console.log('Build Success!')
