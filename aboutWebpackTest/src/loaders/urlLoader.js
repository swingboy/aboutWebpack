//url-loader 并不是复制文件，而是把文件做base64编码，直接嵌入到CSS/JS/HTML代码中。
let mime = require('mime');
module.exports = function(content) {

  var options =  loaderUtils.getOptions(this) || {};
  var limit = options.limit || (this.options && this.options.url && this.options.url.dataUrlLimit);

  if(limit) {
    limit = parseInt(limit, 10);
  }

  var mimetype = options.mimetype || options.minetype || mime.lookup(this.resourcePath);

  if(!limit || content.length < limit) {
    if(typeof content === "string") {
      content = new Buffer(content);
    }
    return "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64"));
  }

  var fallback = options.fallback || "file-loader";
  var fallbackLoader = require(fallback);

  return fallbackLoader.call(this, content);
}

// 默认情况下 会把文件内容当做UTF8 str处理，而我们的文件是二进制的，当做UTF8会导致图片格式错误。
//https://webpack.github.io/docs/loaders.html#raw-loader
module.exports.raw = true