var loaderUtils = require('loader-utils');

module.exports = function(source) {
    var opts = loaderUtils.getOptions(this) || {};

    // console.log(this.context, 'this.context');
    // console.log(this.resource, this.resource);
    // console.info(opts);
    
    // console.log(typeof source, 'typeof sourcetypeof source');
    
    return `//i am the test line;\n${source}`;
};