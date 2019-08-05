let babel = require("@babel/core")
module.exports = function (source, inputSourceMap) {

  let filename = this.request.split('!')[1].split('/').pop();
  let babelOptions = {
    presets: ['@babel/preset-env'],
    inputSourceMap: inputSourceMap,
    filename: filename,
    sourceMaps: true
  }
  let result = babel.transform(source, babelOptions)
  this.callback(null, result.code, result.map)
  //https://webpack.js.org/api/loaders/#this-callback
  // always return undefined when calling callback()
  return;

}