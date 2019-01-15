var dialogAssistant = require('../../Assistant/DialogAssistant.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    rowCount: 30,
    list: [],
    arr: [],
    unReadSpot: false,
		messageNum: "",
    friendList: [],
    showDelete: false,
    shownone:-1,
    skipSmallProgramFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("页面初始化");
    // wx.navigateToMiniProgram({
    //   appId: 'wx8f3556af2f98a160',
    //   path: 'pages/welcome/welcome',
    //   extraData: {
    //     source: "1",
    //     userInfo: app.globalData.agentInfo,
    //     huanAccount: wx.getStorageSync("myUsername")
    //   },
    //   envVersion: app.globalData.environmental,
    //   success(res) {
    //     // 打开成功
    //     that.handleRedDirSpot();
    //   }
    // });
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this;
    console.log("页面onshow监听消息一览也");
    wx.navigateToMiniProgram({
      appId: 'wx8f3556af2f98a160',
      path: 'pages/welcome/welcome',
      extraData: {
        source: "1",
        userInfo: app.globalData.agentInfo,
        huanAccount: wx.getStorageSync("myUsername")
      },
      envVersion: app.globalData.environmental,
      success(res) {
        // 打开成功
        that.handleRedDirSpot();
      }
    });
  },
  /**
   * 消息小红点消失
   */
  handleRedDirSpot: function () {
    wx.setTabBarItem({
      index: 1,
      text: '消息',
      iconPath: "resources/image/xiaoxi-h.png",
      selectedIconPath: "resources/image/xiaoxi-l.png"
    });
  },
  /**
   * 退出后，打开socket长链接
   */
  onUnload() {
  }
})