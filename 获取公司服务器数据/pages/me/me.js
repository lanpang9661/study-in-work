var app = getApp();
var util = require('../../utils/util.js')
var wxApi = require('../../utils/wxApi.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    agentInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      agentInfo: app.globalData.agentInfo
    });
    // app.triggerSocket();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 分享
   */
  onShareAppMessage: function() {
    return require('../../utils/forwardConfig.js').default;
  },

  fx: function() {
    util.fxQrCode(app.globalData.baseUrl + '/xcx/qrCode/getFxQrCode', app.globalData.openId);
  },

  /**
   * 跳转至替他页面
   */
  navigatorPage: function(event) {
    var url = event.currentTarget.dataset.url;
    if (url != '') {
      wx.navigateTo({
        url: url,
      });
    }
  },

  /**
   * 跳转至我的秒豆
   */
  bindMyPoints: function() {
    wx.switchTab({
      url: "/pages/points/points"
    });
  },

  /**
   * 我的名片
   */
  bindMyCard: function() {
    console.log('agentId=' + app.globalData.agentInfo.id);
    wx.navigateToMiniProgram({
      appId: app.globalData.xcx_card_appId,
      path: '/pages/welcome/welcome?agentId=' + app.globalData.agentInfo.id, 
      extraData: {
        foo: 'bar'
      },
      envVersion: app.globalData.environmental,
      success(res) {
        // 打开成功
        console.log('跳转成功');
      }
    });
  }

})