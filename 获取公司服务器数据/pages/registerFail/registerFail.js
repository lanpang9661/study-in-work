// pages/registerFail/registerFail.js
// 定义自身引用指针
var that
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 经纪人Id
    agentId: "",
    // 失败原因
    reason: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      agentId: stringAssistant.nonNull(options.agentId),
      reason: stringAssistant.nonNull(options.reason),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    return require('../../utils/forwardConfig.js').default;
  },
  /**
   * 重新注册点击
   */
  onReRegisterClick: function () {
    wx.reLaunch({
      url: '/pages/register/register?agentId=' + stringAssistant.nonNull(that.data.agentId) + '&reason=' + stringAssistant.nonNull(that.data.reason)
    })
  },

})