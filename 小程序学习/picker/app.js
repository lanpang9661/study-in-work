//app.js
App({
  globalData: {
    userInfo: null,
    // baseUrl: "http://192.168.0.23:8081/snail-app", // 开发环境
    // baseUrl: "http://192.168.0.100:8085/snail-app",// 正式环境
    // baseUrl: "https://www.maifang.com/v-imtest",// 测试环境
    openId: "",
    gaodeMapAPIKey: "b2a85340a13d6ed8a6505302651d9526",
    agentInfo: null,
    fxjs: "",
    extraData: "",
    unionId: "",
    //环境,用于测试跳转小程序使用,当为正式时不用修改,微信自动跳转到正式版,正式：release，体验：trial，开发：develop
    environmental: 'develop',
    //名片小程序appId
    xcx_card_appId: 'wx193c25dc086b6e68'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})