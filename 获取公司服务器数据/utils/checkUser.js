const checkUserUtil ={
  //校验用户
  checkUserInfo : function (globalData) {
    var that = this
    wx.login({
      success: res1 => {
        const code = res1.code;
        wx.getUserInfo({
          success: res2 => {
            globalData.userInfo = res2.userInfo
            wxApi.request({
              //获取openid接口  
              url: globalData.baseUrl + '/xcx/xcxMyInfo/getOpenId',
              data: {
                code: code,
                encryptedData: res2.encryptedData,
                iv: res2.iv
              },
              method: 'GET',
              success: function (res3) {
                const unionId = res3.data.unionId;//获取到的unionId
                const openId = res3.data.openId;//获取到的openid  
                globalData.openId = openId;
                globalData.unionId = unionId;
                globalData.agentInfo = res3.data.userInfo;
                that.userAuth();
              }
            })
          }
        })
      }
    })
  },
  userAuth : function () {
    this.userJump(app.globalData.agentInfo);
  },
  userJump : function (data) {
    let status = 5;
    let recommendUnionId = "";
    if (data) {
      status = data.status;
    }
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (status) {
      case 1: {
        wx.reLaunch({
          url: '/pages/housing/housing'
        })
      } break;
      case 2: {
        wx.reLaunch({
          url: '/pages/waitAuth/waitAuth'
        })
      } break;
      case 3: {
        wx.reLaunch({
          url: '/pages/registerFail/registerFail?reason=' + stringAssistant.nonNull(data.reason) + '&agentId=' + stringAssistant.nonNull(data.id)
        })
      } break;
      case 4: {
        // 账号停用
        wx.reLaunch({
          url: '/pages/accountDisabled/accountDisabled'
        })
      } break;
      case 5: {
        wx.reLaunch({
          url: '/pages/register/register'
        })
      } break;
      default: { }
    }
  },
  userinfo : function (e) {
    var that = this;
    if (e.detail.userInfo == undefined && e.detail.userInfo == undefined) {
      var that = this;
      that.setData({
        show: false
      })
      wx.reLaunch({
        url: '/pages/failAuth/failAuth'
      })
    } else {
      this.checkUserinfo();
      wx.reLaunch({
        url: '/pages/housing/housing'
      })
    }
  }
} 


  module.exports = {
    checkUserUtil: checkUserUtil
  }