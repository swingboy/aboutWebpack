const { ConcatSource } = require("webpack-sources");
let pluginOptions = {
  name: 'myName',
  stage: Infinity
}

class BannerPlugin {
  constructor(doneF, failF) {
    this.doneF = doneF;
    this.failF = failF;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("BannerTest", compilation => {
      compilation.hooks.optimizeChunkAssets.tap("BannerTest", (chunks, callbak) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            compilation.assets[file] = new ConcatSource(
              '\/**i am the banner-  ' + new Date() + '-**\/',
              '\n',
              compilation.assets[file]
            );
          });
        });
      });
    });
  }
}

module.exports = BannerPlugin;