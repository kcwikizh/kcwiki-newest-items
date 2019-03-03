// https://babeljs.io/

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-export-default-from'],
}

// module.exports = {
//   presets: [[require('@babel/preset-env'), { modules: false }], require('@babel/preset-react')],
//   plugins: [
//     require('@babel/plugin-transform-runtime'), // require('@babel/runtime')
//     require('@babel/plugin-proposal-class-properties'),
//     require('@babel/plugin-transform-async-to-generator'),
//     [require('@babel/plugin-proposal-decorators'), { legacy: true }],
//   ],
// }
