module.exports = function (content) {
    // console.log('sck');
    var style = document.createElement("style")
    style.innerHTML = content;
    document.head.appendChild(style)
}