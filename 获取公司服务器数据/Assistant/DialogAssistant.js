var stringAssistant = require("./StringAssistant.js")
/**
 * 显示文字Toast的方法
 */
function showToast(content) {
  wx.showToast({
    title: content,
    icon: 'none'
  })
}
/**
 * 显示加载中
 */
function showLoading(content) {
  wx.showLoading({
    title: stringAssistant.nonNull(content),
    mask: true
  })
}
/**
 * 隐藏加载中
 */
function dissmissLoading() {
  wx.hideLoading()
}

module.exports = {
  showToast: showToast,
  showLoading: showLoading,
  dissmissLoading: dissmissLoading,
}