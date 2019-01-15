// pages/points/points.js
var app = getApp();
var util = require('../../utils/util.js')
var wxApi =  require('../../utils/wxApi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointsTell:'',
    invitedCounts:0,
    mbeanTotal:0,
    recommendAllUsers:null,//已邀请
    recommendSuccessUsers:null,//已注册成功
    yyqCount:0,
    ytgCount:0,
    rau:'none',//已邀请下拉
    rsu:'none',//已注册
    yyqViewShow:'none',
    ytgViewShow:'none',
    yyqBtnClass:'down',
    ytgBtnClass:'down',
    yyqOpenClass:'open',
    ytgOpenClass:'open'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPointsInfo();
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
    // app.triggerSocket();
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return require('../../utils/forwardConfig.js').default;
  },
  fx: function () {
    util.fxQrCode(app.globalData.baseUrl + '/xcx/qrCode/getFxQrCode', app.globalData.openId);
  },
  getPointsInfo:function (){
    let that = this;
    wxApi.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/points/index',
      data: {
        openId: app.globalData.openId,
        agentId: app.globalData.agentInfo.id,
        cityCode: app.globalData.agentInfo.cityCode,
      },
      dataType: "json",
      method: 'GET',
      complete: function (res3) {
        if (res3.data.data){
          let rauCount = 0;
          let recommendAllUsers = res3.data.data.recommendAllUsers;
          if (recommendAllUsers){
            rauCount = recommendAllUsers.length;
          }else{
            recommendAllUsers = null;
          }
          let rsuCount = 0;
          let recommendSuccessUsers = res3.data.data.recommendSuccessUsers
          if (recommendSuccessUsers){
            rsuCount = recommendSuccessUsers.length;
          }else{
            recommendSuccessUsers = null
          }
          let yyqViewShow = rauCount == 0 ? 'none':'block'
          let rau = rauCount <8 ?'none':'block';
          let rsu = rauCount <8 ? 'none' : 'block';
          let ytgViewShow = rauCount == 0 ? 'none' : 'block';
          let invitedCounts = 0;
          if (res3.data.data.invitedCounts){
            invitedCounts = res3.data.data.invitedCounts
          }
          let mbeanTotal = 0;
          if (res3.data.data.mbeanTotal) {
            mbeanTotal = res3.data.data.mbeanTotal;
          }
          that.setData({
            invitedCounts: invitedCounts,
            mbeanTotal: mbeanTotal,
            recommendAllUsers: recommendAllUsers,
            recommendSuccessUsers: recommendSuccessUsers,
            yyqCount: rauCount,
            ytgCount: rsuCount,
            rau:rau,
            rsu:rsu,
            yyqViewShow: yyqViewShow,
            ytgViewShow: ytgViewShow,
            pointsTell: res3.data.data.pointsTell
          })
        }
      }
    })
  },
  makeCall:function (){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.pointsTell
    })
  },
  ytgBtnFun: function () {
    let isShow = '';
    let ytgOpenClass = '';
    if (this.data.ytgBtnClass == 'down') {
      isShow = 'up';
    } else {
      isShow = 'down';
      ytgOpenClass = 'open'
    }
    this.setData({
      ytgBtnClass: isShow,
      ytgOpenClass: ytgOpenClass
    });
  },
  yyqBtnFun: function () {
    let isShow = '';
    let yyqOpenClass = '';
    if (this.data.yyqBtnClass == 'down') {
      isShow = 'up';
    } else {
      isShow = 'down';
      yyqOpenClass = 'open';
    }
    this.setData({
      yyqBtnClass: isShow,
      yyqOpenClass: yyqOpenClass
    });
  },
  mbeanTotalDetail:function (){
    wx.navigateTo({
      url: '/pages/mdrecord/mdrecord'
    })
  }
})