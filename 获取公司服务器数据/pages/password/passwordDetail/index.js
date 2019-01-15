// pages/passwordDetail/index.js
var app = getApp()
var timer = null
const util = require('../../../utils/util.js')
// 定义String工具类
var stringAssistant = require('../../../Assistant/StringAssistant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    time: 0,
    clock: "",
    entity: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showLoading()
    this.fetch()
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
    this.clearTimer()
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

  getFormatCountDown: function (countDown) {
    var seconds = 0
    var minutes = 0
    var hours = 0
    var day = 0
    if (countDown >= 0) {
      seconds = countDown
      if (seconds > 59) {
        minutes = Math.floor(seconds / 60)
        seconds = seconds % 60
        if (minutes > 59) {
          hours = Math.floor(minutes / 60)
          minutes = minutes % 60
          if (hours > 23) {
            day = Math.floor(hours / 24)
            hours = hours % 24
          }
        }
      }
    }
    return day > 0 ? `${day}天${hours}小时${minutes}分${seconds}秒`
      : `${hours}小时${minutes}分${seconds}秒`
  },

  setCountDown: function (that) {
    var deadline = that.data.time
    var countDown = deadline - Date.parse(new Date()) / 1000
    that.setData({
      clock: that.getFormatCountDown(countDown)
    })
    if (countDown <= 0) {
      return
    }
    timer = setTimeout(function () {
      that.setData({
        clock: that.getFormatCountDown(countDown)
      })
      that.setCountDown(that)
    }, 1000)
  },

  clearTimer: function () {
    clearTimeout(timer)
  },

  fetch: function () {
    var that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxLock/getHouseLockPassword",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        id: that.data.id,
        openId: app.globalData.openId
      },
      complete: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res == null || res.data == null || res.data.code != "1") {
          util.toastError(res)
        } else {
          var timestamp = Date.parse(new Date()) / 1000 + res.data.data.remainingSeconds
          var newPassword = ""
          if (undefined != res.data.data && null != res.data.data && !stringAssistant.isEmpty(res.data.data.password)) {
            newPassword = res.data.data.password + "#"
            res.data.data.password = newPassword
          }
          that.setData({
            entity: res.data.data,
            time: timestamp
          })
          that.setCountDown(that)
        }
      }
    })
  },

  longClickPassword: function () {
    var password = this.data.entity.password
    if (password) {
      wx.setClipboardData({
        data: password,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              if (password == res.data) {
                wx.showToast({
                  title: '密码已复制到剪贴板',
                  icon: 'none'
                })
              }
            }
          })
        }
      })
    }
  },
  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  }
})