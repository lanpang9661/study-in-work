// pages/register/register.js
var app = getApp()
// 定义自身引用指针
var that
const util = require('../../utils/util.js')
// 定义对话框工具类
var dialogAssistant = require('../../Assistant/DialogAssistant.js')
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
var timer = null
// 定义输入部分全局变量
var name = ""
var phone = ""
var code = ""
var store = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    interval: 60,
    isAgree: false,
    time: 0,
    disableGetCodeBtn: false,
    getCodeBtnText: "获取验证码",
    // 经纪人Id
    agentId: "",
    // 失败原因
    reason: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      agentId: stringAssistant.nonNull(options.agentId),
      reason: stringAssistant.nonNull(options.reason),
    })
    console.log("设置的数据为")
    console.log(that.data)
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
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindPhoneInput: function (res) {
    that.phone = res.detail.value
  },
  bindCodeInput: function (res) {
    that.code = res.detail.value
  },
  onGetCodeClick: function() {
    wx.showLoading()
    var that = this
    var phoneNum = that.phone
    if (phoneNum == '13777777777'){
      return false;
    }
    if (!stringAssistant.isEmpty(phoneNum) && phoneNum.length > 0 && stringAssistant.isValidPhoneNumber(phoneNum)) {
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxSms/code",
        method: "GET",
        data: {
          openId: app.globalData.openId,
          phone: phoneNum
        },
        complete: function(res) {
          console.log(res)
          wx.hideLoading()
          if (res == null || res.data == null || res.data.code != "1") {
            util.toastError(res)
          } else {
            that.startCountDown()
          }
        }
      })
    } else {
      this.showWarning('请输入正确的手机号')
    }
  },
  startCountDown: function() {
    var t = this.data.interval
    this.setData({
      time: Date.parse(new Date()) / 1000 + t,
      disableGetCodeBtn: true,
      getCodeBtnText: "" + t
    })
    var that = this
    timer = setInterval(function() {
      var time = that.data.time
      var now = Date.parse(new Date()) / 1000
      var interval = time - now
      if (interval == 0) {
        that.setData({
          time: 0,
          disableGetCodeBtn: false,
          getCodeBtnText: "获取验证码"
        })
        clearInterval(timer)
      } else {
        that.setData({
          getCodeBtnText: "" + interval
        })
      }
    }, 1000)
  },
  bindNameInput: function(res) {
    that.name = res.detail.value
  },
  bindCodeInput: function(res) {
    that.code = res.detail.value
  },
  bindStoreInput: function(res) {
    that.store = res.detail.value
  },
  onCommitClick: function() {
    var requestData = {}
    if (this.checkInput()) {
      wx.showLoading({
        title: '注册中',
      })
      requestData = {
        openId: app.globalData.openId,
        iCode: that.code,
        tell: that.phone,
        unionId: app.globalData.unionId
      }
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxMyInfo/activation",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        dataType: "json",
        data: requestData,
        complete: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.code == "0"){
            wx.showLoading({
              title: '验证码错误',
            })
          } else if (res.data.code == "1"){
            wx.showLoading({
              title: '没有该用户',
            })
            that.userJump(5)
          } else if (res.data.code == "3"){
            wx.showLoading({
              title: '系统错误',
            })
          }else{
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            app.globalData.agentInfo = res.data.data
            var statusGet = res.data.data.status
            that.userJump(statusGet)
          }
        }
      })
    }
  },
  userJump: function(isSysUser) {
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (isSysUser) {
      case 1:
        {
          wx.switchTab({
            url: '/pages/housing/housing'
          })
        }
        break;
      case 2:
        {
          wx.reLaunch({
            url: '/pages/waitAuth/waitAuth'
          })
        }
        break;
      case 3:
        {
          wx.reLaunch({
            url: '/pages/registerFail/registerFail'
          })
        }
        break;
      case 4:
        {
          // 账号停用
          wx.reLaunch({
            url: '/pages/accountDisabled/accountDisabled'
          })
        }
        break;
      case 5:
        {
          wx.reLaunch({
            url: '/pages/register/register'
          })
        }
        break;
      default:
        {}
    }
  },
  checkInput: function() {
    var result = true
      if (stringAssistant.isEmpty(that.phone) || that.phone.length == 0) {
        that.showWarning('请输入手机号')
        result = false
      } else {
        if (stringAssistant.isEmpty(that.code) || that.code.length == 0) {
          that.showWarning('请输入验证码')
          result = false
        }else{
          if (!that.data.isAgree) {
            that.showWarning('请阅读并同意用户协议')
            result = false
          }
        }
      }
    return result
  },
  showWarning: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },
  onShareAppMessage: function() {
    return require('../../utils/forwardConfig.js').default;
  }
})