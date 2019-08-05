const { ConcatSource } = require("webpack-sources");
let pluginOptions = {
    name: 'myName',
    stage: Infinity
}

class ResultPlugin {
    constructor(doneF, failF) {
      this.doneF = doneF;
      this.failF = failF;
    }
    
    apply(compiler) {
        compiler.hooks.done.tap(pluginOptions,  (stats) => {
            this.doneF('我成功了');
        });

        compiler.hooks.failed.tap(pluginOptions,   (err) => {
            this.failF(err);
        });

        compiler.hooks.compilation.tap("BannerTest", compilation => {
			compilation.hooks.optimizeChunkAssets.tap("BannerTest", (chunks, callbak)  => {
				chunks.forEach(chunk => {
                    chunk.files.forEach(file => {
                        compilation.assets[file] = new ConcatSource(
                        '\/**Sweet Banner**\/',
                        '\n',
                        compilation.assets[file]
                        );
                    });
                });
			});
		});

        
    }
  }

  module.exports = ResultPlugin;