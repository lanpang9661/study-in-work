// pages/me/information/information.js
var app = getApp()
// 定义自身引用指针
var that
// 定义String工具类
var stringAssistant = require('../../../Assistant/StringAssistant.js')
// 定义弹出框工具类
var dialogAssistant = require('../../../Assistant/DialogAssistant.js')
const util = require('../../../utils/util.js')
// 获取验证码倒计时用的timer
var timer = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    phone: "",
    store: "",
    // 倒计时总时间
    interval: 60,
    // 倒计时当前时间
    time: 0,
    // 未修改前的电话
    phoneSource: "",
    // 获取验证码一行是否显示
    isShowCodeLine: false,
    // 获取验证码按钮是否是disable的
    disableGetCodeBtn: false,
    // 获取验证码按钮显示的文字
    getCodeBtnText: "获取验证码",
    // 输入的验证码
    code: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var info = app.globalData.agentInfo
    if (info) {
      this.setData({
        name: info.agentName,
        phone: info.tell,
        store: info.company,
        phoneSource: info.tell,
      })
    }
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
  onSaveClick: function() {
    console.log("onSaveClick")
    if (this.checkInput()) {
      wx.showLoading()
      var that = this;
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxMyInfo/updateAgent",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        dataType: "json",
        data: {
          openId: app.globalData.openId,
          agentName: that.data.name,
          tell: that.data.phone,
          iCode: that.data.code,
          company: that.data.store
        },
        complete: function(res) {
          wx.hideLoading()
          console.log(res.data)
          if (res == null || res.data == null || res.data.code != "1") {
            if (res.data.code == "0" && res.data.data == "2") {
              dialogAssistant.showToast("验证码错误")
            } else {
              util.toastError(res)
            }
          } else {
            if (res.data.data == "3") {
              dialogAssistant.showToast("手机号已被注册")
            } else {
              console.log("success")
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                complete: function() {
                  // 跳转回去
                  setTimeout(function() {
                    wx.navigateBack(1)
                  }, 1000)
                },
              })
              app.globalData.agentInfo.agentName = that.data.name
              app.globalData.agentInfo.tell = that.data.phone
              app.globalData.agentInfo.company = that.data.store
            }
          }
        }
      })
    }
  },
  checkInput: function() {
    var result = true
    if (stringAssistant.isEmpty(this.data.name) || this.data.name.length == 0) {
      this.showWarning('姓名不能为空')
      result = false
    } else {
      if (stringAssistant.isEmpty(this.data.phone) || this.data.phone.length == 0) {
        this.showWarning('电话号码不能为空')
        result = false
      } else {
        if (!stringAssistant.isEmpty(this.data.phone) && this.data.phone.length > 0 && stringAssistant.isValidPhoneNumber(this.data.phone)) {
          if (!stringAssistant.isEmpty(this.data.name) && this.data.name.length > 4) {
            this.showWarning('姓名不得超过4个字')
            result = false
          } else {
            if (!stringAssistant.isEmpty(this.data.name) && this.data.name.length < 2) {
              this.showWarning('姓名不得少于2个字')
              result = false
            } else {
              if (!stringAssistant.isEveryWordChinese(this.data.name)) {
                this.showWarning('姓名必须都为汉字')
                result = false
              } else {
                if (this.data.isShowCodeLine && stringAssistant.isEmpty(this.data.code)) {
                  result = false
                  this.showWarning('请输入验证码')
                } else {
                  result = true
                }
              }
            }
          }
        } else {
          this.showWarning('请输入正确的手机号')
          result = false
        }
      }
    }
    if (result && stringAssistant.isEmpty(this.data.store)) {
      this.showWarning('请输入公司名称');
      result = false;
    }
    return result
  },
  showWarning: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  },

  bindNameBlur: function(res) {
    if (!stringAssistant.isEmpty(res.detail.value) && res.detail.value.length > 4) {
      var newString = res.detail.value.substring(0, 4)
      this.setData({
        name: newString
      })
    } else {
      this.setData({
        name: res.detail.value
      })
    }
  },
  bindPhoneBlur: function(res) {
    this.setData({
      phone: res.detail.value
    })
    // 根据输入的字符长度判断是否显示验证码一行
    if (res.detail.value.length >= 11 && this.data.phone != this.data.phoneSource) {
      this.setData({
        isShowCodeLine: true
      })
    } else {
      this.setData({
        isShowCodeLine: false
      })
    }
  },
  /**
   * 获取验证码点击
   */
  onGetCodeClick: function() {
    wx.showLoading()
    var that = this
    var phoneNum = this.data.phone
    if (phoneNum.length > 0 && stringAssistant.isValidPhoneNumber(phoneNum)) {
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
  /**
   * 开始倒计时的方法
   */
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
  /**
   * 绑定验证码输入
   */
  onCodeInput: function(res) {
    console.log("onCodeInput" + res.detail.value)
    this.setData({
      code: res.detail.value
    })
  },
  onShareAppMessage: function() {
    return require('../../../utils/forwardConfig.js').default;
  },
  /**
   * 公司名称保存
   */
  bindCompanyNameBlur: function (res) {
    this.setData({
      store: res.detail.value
    });
  }
})