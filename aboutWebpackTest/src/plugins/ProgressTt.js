var webpack = require('webpack');

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
  };
  
 module.export = new webpack.ProgressPlugin(handler);