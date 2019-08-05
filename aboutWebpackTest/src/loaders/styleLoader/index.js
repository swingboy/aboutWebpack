var loaderUtils = require('loader-utils');
var path = require('path');
// pitching loader 
module.exports.pitch = function (request) {
    var a = 'var content=require(' + loaderUtils.stringifyRequest(this, '!!' + request) + ')';
    var result = [
        //// 得到 css 内容
        a , 
        /// 调用  addStyle 把CSS内容插入到DOM中
        'require(' + loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, "insert.js")) + ')(content)', 
        // 如果发现启用了 css modules，则默认导出它
        'if(content.locals) module.exports = content.locals'
    ]
    return result.join(';')

}
