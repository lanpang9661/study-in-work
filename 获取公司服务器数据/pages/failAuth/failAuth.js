// pages/failAuth/failAuth.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.userinfoF()
        } else {
          console.log(2)
        }
      }
    })
  },
  userinfoF: function () {
    var that = this
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
                const openId = res3.data.openId;//获取到的openid  
                console.log("openid" + openId)
                app.globalData.openId = openId;
                app.globalData.unionId = unionId;
                that.userAuth();
              }
            })
          }
        })
      }
    })
  }, userAuth: function () {
    var that = this;

    //获取用户成功后判断是否为系统用户
    wx.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/xcxMyInfo/getInfoByOpenId',
      data: {
        openId: app.globalData.openId,
        //unionId: app.globalData.unionId, 
        // openId: app.globalData.openId
      },
      method: 'GET',
      success: function (res) {
        // TODO 测试
        if (res.data.code == 0) {
          wx.showLoading({
            title: "初始化失败"
          })
          return;
        }
        var status;
        if (res.data.data == null) {
          status = 5
        } else {
          status = res.data.data.status
          app.globalData.agentInfo = res.data.data;
        }
        // 看看审核回来啥
        console.log(res)
        // var status = 5
        if (status == 1) {
          wx.request({
            url: app.globalData.baseUrl + "/xcx/xcxMyInfo/getInfoByOpenId",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              openId: app.globalData.openId,
              //unionId: app.globalData.unionId,
              //openId: app.globalData.openId 
            },
            method: 'POST',
            success: function (res) {
              console.log("用户认证" + res)
              if (res == null || res.data == null || res.data.code != "1") {
                // 请求失败
                console.error('网络请求失败');
                util.toastError(res)
              } else {
                // 请求成功
                app.globalData.agentInfo = res.data.data
                that.userJump(status, res.data.data)
              }
            }
          })
        } else {
          that.userJump(status, res.data.data)
        }
      }
    })


  },
  userJump: function (isSysUser, data) {
    console.log("userJump")
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (isSysUser) {
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
          url: '/pages/registerFail/registerFail?reason=' + stringAssistant.nonNull(data.reason) + '&agentId=' +        stringAssistant.nonNull(data.id)
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
  }
})