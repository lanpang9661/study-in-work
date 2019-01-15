// pages/register/register.js
var app = getApp()
// 定义自身引用指针
var that
const util = require('../../utils/util.js')
// 定义对话框工具类
var dialogAssistant = require('../../Assistant/DialogAssistant.js')
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
var authImgUtil = require('../../utils/authImgUtil.js')
var timer = null
// 定义输入部分全局变量
var name = ""
var phone = ""
var code = ""
var store = ""
var vm;
var list = [];
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
    recommendUnionId:"",
    imgAutoCode: '',
    nowProvince:"",
    nowCity:"选择城市",
    nowCityCode:'',
    noOpen:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let recommendUnionId = wx.getStorageSync("recommendUnionId");
    that = this
    that.setData({
      agentId: stringAssistant.nonNull(options.agentId),
      reason: stringAssistant.nonNull(options.reason),
      recommendUnionId: stringAssistant.nonNull(recommendUnionId)
    });
    this.getLocalCity();
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
    
    this.canvasAuthChange();
    
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

  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindPhoneInput: function(res) {
    that.phone = res.detail.value
  },
  onGetCodeClick: function() {
    wx.showLoading()
    var that = this
    var phoneNum = that.phone
    let store = that.store
    if (!store){
      store = '';
    }
    let provinceName = "";
    let cityName = "";
    if (this.data.nowCity != '' && this.data.nowCity != '选择城市'){
      cityName = this.data.nowCity;
      provinceName = this.data.nowProvince;
    }
    let agentname = that.name;
    if (!agentname){
      agentname='';
    }
    if (!stringAssistant.isEmpty(phoneNum) && phoneNum.length > 0 && stringAssistant.isValidPhoneNumber(phoneNum)) {
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxSms/code",
        method: "GET",
        data: {
          openId: app.globalData.openId,
          phone: phoneNum,
          province: provinceName,
          city: cityName,
          agentName: agentname,
          tell: phoneNum,
          company: store
        },
        complete: function(res) {
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
  bindImgAutoCodeInput: function (res){
    that.imgAutoCodeInput = res.detail.value
  },
  bindStoreInput: function(res) {
    that.store = res.detail.value
  },
  onCommitClick: function() {
    if (this.checkInput()) {
      var that = this
      var requestData = {}
      let agentname = that.name;
      let provinceName = "";
      let cityName = "";
      let cityCode = "";
      if (this.data.nowCity != '' && this.data.nowCity != '选择城市') {
        cityName = this.data.nowCity;
        cityCode = this.data.nowCityCode;
        provinceName = this.data.nowProvince;
      }else{
        dialogAssistant.showToast("请选择城市");
        return false;
      }
      wx.showLoading({
        title: '注册中'
      })
      if (stringAssistant.isEmpty(that.data.agentId)) {
        requestData = {
          openId: app.globalData.openId,
          iCode: that.code,
          agentName: that.name,
          tell: that.phone,
          company: that.store,
          unionId: app.globalData.unionId,
          recommendUnionId: that.data.recommendUnionId,
          wxImg :app.globalData.userInfo.avatarUrl,
          province: provinceName,
          city: cityName,
          cityCode: cityCode
        }
      } else {
        requestData = {
          openId: app.globalData.openId,
          iCode: that.code,
          agentName: that.name,
          tell: that.phone,
          company: that.store,
          agentId: that.data.agentId,
          unionId:app.globalData.unionId,
          wxImg :app.globalData.userInfo.avatarUrl,
          province: provinceName,
          city: cityName,
          cityCode: cityCode
        }
      }
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxMyInfo/insertAgent",
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        dataType: "json",
        data: requestData,
        complete: function(res) {
          
          wx.hideLoading()
          if (res == null || res.data == null || res.data.code != "1") {
            if (res.data.code == "0" && res.data.data == 2) {
              dialogAssistant.showToast("验证码错误")
            } else {
              util.toastError(res)
            }
          } else {
            if (res.data.data == "3") {
              dialogAssistant.showToast("该手机号可能已在蜗牛家注册请在蜗牛家登录跳转一次")
            } else {
              wx.showToast({
                title: '注册成功',
                icon: 'success'
              })
              // 存储数据
              app.globalData.agentInfo = res.data.data
              // 跳转
              var statusGet = res.data.data.status;
              wx.removeStorage({key:"recommendUnionId"});
              that.userJump(statusGet)
            }
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
    var result = true;
    if (!this.data.noOpen){
      that.showWarning('该城市尚未开通')
      result = false
    }else if (stringAssistant.isEmpty(that.name) || that.name.length == 0) {
      that.showWarning('请输入姓名')
      result = false
    } else if (stringAssistant.isEmpty(that.phone) || that.phone.length == 0) {
      that.showWarning('请输入手机号')
      result = false
    } else if (stringAssistant.isEmpty(that.code) || that.code.length == 0) {
      that.showWarning('请输入验证码')
      result = false
    } else if (stringAssistant.isEmpty(that.imgAutoCodeInput) || that.imgAutoCodeInput != that.data.imgAutoCode) {
      that.showWarning('图片验证码错误')
      result = false
    } else if (stringAssistant.isEmpty(that.store) || that.store.length == 0) {
      that.showWarning('请输入所属公司信息')
      result = false
    } else if (!stringAssistant.isEmpty(that.store) && that.store.length < 2) {
      that.showWarning('所属公司信息不得少于2个字')
      result = false
    } else if (!that.data.isAgree) {
      that.showWarning('请阅读并同意用户协议')
      result = false
    } else if (!stringAssistant.isEmpty(that.name) && that.name.length > 4) {
      that.showWarning('姓名不得超过4个字')
      result = false
    } else if (!stringAssistant.isEmpty(that.name) && that.name.length < 2) {
      result = false
      that.showWarning('姓名不得少于2个字')
    } else if (!stringAssistant.isEveryWordChinese(that.name)) {
      that.showWarning('姓名必须都为汉字')
      result = false
    } else {
      result = true
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
  },
  forwardingLogin:function(){
    wx.navigateTo({
      url: '/pages/activation/activation'
    })
  },
  canvasAuthChange:function (){
    let ctx = wx.createCanvasContext('canvasAuth');
    authImgUtil.drawPic(that, ctx);
  },
  
  getLocalCity:function (){
    let that = this;
    wx.getLocation({
      success: function(res) {
        let lat = res.latitude;
        let lng = res.longitude;
        that.makeCity(lat, lng);
      },
      fail: function (res3){
        //that.makeCity('','');
      }
    })
  },
  makeCity: function (lat, lng){
    let that = this;
    wx.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/xcxOpenCity/getLocalCity',
      data: {
        openId: app.globalData.openId,
        lat: lat,
        lng: lng
      },
      dataType: "json",
      method: 'GET',
      complete: function (res3) {
        let nowProvince = res3.data.nowProvince;
        let nowCity = res3.data.nowCity;
        let nowCityCode = res3.data.nowCityCode;
        let cityFlag = res3.data.cityFlag;
        if (cityFlag){
          that.setData({
            nowProvince: nowProvince,
            nowCity: nowCity,
            nowCityCode: nowCityCode
          });
        }
      }
    });
  }
})

