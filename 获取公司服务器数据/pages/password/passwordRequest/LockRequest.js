// pages/password/passwordRequest/LockRequest.js
// 定义自身引用指针
var that
// 定义全局app实例
var app = getApp()
// 定义工具类
const util = require('../../../utils/util.js')
var stringAssistant = require('../../../Assistant/StringAssistant.js')
// 定义输入框使用的全局变量
var name = ""
var remark = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId: "",
    phoneNumber: "",
    shoujiFouce: false,
    shoujiNum: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("开始onLoad")
    console.log(options)
    that = this
    // 从父界面获取数据
    that.setData({
      houseId: options.houseId
    })
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
   * 显示Toast
   */
  showToast: function(message) {
    var msg = ""
    if (message.length > 0) {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: "none"
    })
  },
  /**
   * 显示加载中
   */
  showLoading: function() {
    wx.showLoading({
      title: "数据加载中..",
      mask: true
    })
  },
  /**
   * 隐藏加载中
   */
  dissmissLoading: function() {
    wx.hideLoading()
  },
  /**
   * 姓名输入监听
   */
  onNameInput: function(event) {
    that.name = event.detail.value
  },
  /**
   * 电话输入监听
   */
  shoujiNumInput: function(event) {
    console.log("电话输入:")
    console.log(event)
    that.setData({
      shoujiNum: event.detail.value
    })
  },
  /**
   * 备注输入监听
   */
  onRemarkInput: function(event) {
    that.remark = event.detail.value
  },
  /**
   * 确定点击处理
   */
  onConfirmClick: function() {
    console.log("正在请求申请开锁...")
    console.log("that.data.houseId 是")
    console.log(that.data.houseId)
    // 请求申请开锁
    if (that.checkInput()) {
      that.showLoading()
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxLock/getRequestPassword",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        dataType: "json",
        data: {
          openId: app.globalData.openId,
          houseSourceId: that.data.houseId,
          customerName: that.name,
          customerTell: that.data.phoneNumber,
          remark: that.remark,
        },
        complete: function(res) {
          console.log("请求完成")
          console.log(res.data)
          if (res == null || res.data == null || res.data.code != "1") {
            // 请求失败
            console.error('网络请求失败');
            that.showToast('网络请求失败')
          } else {
            console.log("请求成功")
            that.openLockDetail(res.data.data)
          }
          that.dissmissLoading()
        }
      })
    }
  },

  /**
   * 检查输入的方法
   */
  checkInput: function() {
    var isSuccess = false
    // if (stringAssistant.isEmpty(that.name)) {
    //   that.showToast("请输入姓名")
    //   isSuccess = false
    // }
    // else {
    if (!stringAssistant.isEmpty(that.data.shoujiNum[0]) && !stringAssistant.isEmpty(that.data.shoujiNum[1]) && !stringAssistant.isEmpty(that.data.shoujiNum[2]) && !stringAssistant.isEmpty(that.data.shoujiNum[3]) && !stringAssistant.isEmpty(that.data.shoujiNum[4]) && !stringAssistant.isEmpty(that.data.shoujiNum[5]) && !stringAssistant.isEmpty(that.data.shoujiNum[6])) {
      isSuccess = true
      var tempPhoneNumber = that.data.shoujiNum[0] + that.data.shoujiNum[1] + that.data.shoujiNum[2] + "****" + that.data.shoujiNum[3] + that.data.shoujiNum[4] + that.data.shoujiNum[5] + that.data.shoujiNum[6]
      that.setData({
        phoneNumber: tempPhoneNumber
      })
    } else {
      that.showToast("请输入电话")
      isSuccess = false
    }
    return isSuccess
    // }

  },
  /**
   * 跳转到开锁详细界面
   */
  openLockDetail: function(id) {
    console.log("正在跳转到开锁详细...")
    wx.redirectTo({
      url: "../../password/passwordDetail/index?id=" + id,
    })
  },
  shoujiFouceFn: function() {
    this.setData({
      shoujiFouce: true
    })
  },
  onShareAppMessage: function() {
    return require('../../../utils/forwardConfig.js').default;
  }
})