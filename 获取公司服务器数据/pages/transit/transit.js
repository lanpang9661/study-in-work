// pages/transit/transit.js
let app = getApp();
var stringAssistant = require('../../Assistant/StringAssistant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    passData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    if (app.globalData.extraData != null && app.globalData.extraData!=""){
      that.setData({
        passData: app.globalData.extraData
      })
      console.log("tell"+app.globalData.extraData.tell)
    }
   

    if (app.globalData.extraData != null && app.globalData.extraData != "") {
      app.globalData.agentInfo = that.data.passData;
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  userJump: function (isSysUser) {
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (isSysUser) {
      case 1: {
        wx.reLaunch({
          url: '/pages/housing/housing'
        })
      } break;
      case 2: {
        wx.reLaunch({
          url: '/pages/register/register'
        })
      } break;
      default: { }
    }
  }, userinfo: function (e) {
    var that = this
    if (e.detail.userInfo == undefined && e.detail.userInfo == undefined) {
      that.setData({
        show: false
      })
      wx.reLaunch({
        url: '/pages/failAuth/failAuth'
      })
    } else {
      that.setData({
        show: false,
      })
    }
    wx.login({
      success: res1 => {
        const code = res1.code;
        wx.getUserInfo({
          success: res2 => {
            app.globalData.userInfo = res2.userInfo
            wx.request({
              //获取openid接口  
              url: app.globalData.baseUrl + '/xcx/xcxMyInfo/getOpenId',
              data: {
                code: code,
                encryptedData: res2.encryptedData,
                iv: res2.iv
              },
              method: 'GET',
              success: function (res3) {
                const unionId = res3.data.unionId;//获取到的unionId
                that.setData({
                  show: false
                })
                app.globalData.unionId = unionId;
                const openId = res3.data.openId;//获取到的openid  
                app.globalData.openId = openId;
                if (that.data.passData.tell != null && that.data.passData.tell != "" && that.data.passData.tell!=undefined){
                  that.updateAgent(that.data.passData.id, unionId, that.data.passData.agentName, openId, that.data.passData.status, that.data.passData)
                }else{
                  that.gerUserStatus();
                }
              }
            })
          }
        })
      }
    })
  },
  updateAgent: function (agentId, unionId, agentName, openId, status,passData){
    console.log("status:"+status)
    var that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxMyInfo/updateAgentWnj",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      data: {
        agentId: agentId,
        unionId: unionId,
        agentName: agentName,
        openId: openId
      },
      complete: function (res) {
        console.log("请求完成")
        console.log(res.data)
        if (res == null || res.data == null || res.data.code != "1") {
          app.globalData.agentInfo = res.data.data;
          // 请求失败
          console.error('网络请求失败');
          that.showToast('网络请求失败')
        } else {
          if (status==2){
            wx.reLaunch({
              url: '/pages/waitAuth/waitAuth'
            })
          }else if (status == 3){
            wx.reLaunch({
              url: '/pages/registerFail/registerFail?reason=' + stringAssistant.nonNull(passData.reason) + '&agentId=' + stringAssistant.nonNull(passData.id)
             })
          }else{
            that.userJump(1)
          }
        }
        that.dissmissLoading()
      }
    })
  },showToast: function (message) {
    var msg = ""
    if (message.length > 0) {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: "none"
    })
  },/**
   * 隐藏加载中
   */
  dissmissLoading: function () {
    wx.hideLoading()
  },
  gerUserStatus:function(){
    var that = this;
    wx.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/xcxMyInfo/getInfoByOpenId',
      data: {
        openId: app.globalData.openId,
      },
      method: 'GET',
      success: function (res) {
        if (res.data != null && res.data != "" && res.data.data.agentName != null && res.data.data.agentName !=""){

          if (res.data.data.status == 2) {
            wx.reLaunch({
              url: '/pages/waitAuth/waitAuth'
            })
          } else if (res.data.data.status == 3) {
            wx.reLaunch({
              url: '/pages/registerFail/registerFail?reason=' + stringAssistant.nonNull(res.data.data.reason) + '&agentId=' + stringAssistant.nonNull(res.data.data.id)
            })
          }else{
            that.userJump(1);
          }
          app.globalData.agentInfo = res.data.data;
        }else{
          that.userJump(2);
        } 
      }
    })
  }
})