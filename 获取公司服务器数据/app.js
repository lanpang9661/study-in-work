/*
 * 审核人员请看!!审核人员请看!!
 * 以下为写给小程序审核人员:
 * 因我们功能中有"开锁"字样,因某次上架审核被拒,原因认为开锁为"生活类服务->开锁服务",
 * 但是我们是做房地产销售/代销售的,销售的房屋有门锁式电子密码锁,经纪人带 客户看房的时候需要申请密码打开代销售的房屋,
 * 实际上房屋经营权是归我们蜗牛家所有,门锁也是我们自己安装,与市面上的公安局备案的代理开锁服务不一样,
 * 总结来说这个开锁功能就是销售人员打开我们自己的房门.
 * 开锁页面没有数据，是因为账号需要操作开门，才会看到开门记录。
 */
const util = require('/utils/util.js');
App({
  globalData: {
    userInfo: null,
    baseUrl: "http://192.168.0.23:8081/snail-app", // 开发环境
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
  onLaunch: function(options) {
    var that = this;
    //更新配置
    //获取跳转过来的数据
    var extraData = null;
    if (options.referrerInfo != undefined) {
      if (options.referrerInfo.extraData) {
        extraData = options.referrerInfo.extraData
        // console.log(extraData) 12345...
      }
    }
    this.globalData.extraData = extraData;

  },
  onShow() {
    console.log("又进来啦！！！！！");
    var that = this;
    // 轮询方法
    that.polling();
  },
  onHide() {
    var that = this;
    console.log("又出去啦！！！！！");
    // 停止轮询方法
    that.stopPolling('imInterval');
  },
  /**
   * 定一定时期的方法
   */
  polling: function() {
    var that = this;
    var init = true;
    // 定义定时器
    var imInterval = setInterval(function() {
      console.log("进入轮询方法");
      // 判断当第一次进入或满足开启轮询的方法
      if (init || that.startPolling()) {
        // 打开长轮询
        wx.request({
          url: that.globalData.baseUrl + "/api/social/offlineMsgCount",
          data: {
            account: wx.getStorageSync("myUsername")
          },
          dataType: "json",
          method: "GET",
          success: function(res) {
            console.log("轮询开始");
            init = false;
            if (res.data.data != null ||
              res.data.data.offLineMsgCount != "-1" ||
              res.data.data.offLineMsgCount == "-2") {
              // 离线消息数目
              wx.setStorageSync("offLineMsgCount", res.data.data.offLineMsgCount);
              // 当数目大于0时显示小红点
              if (res.data.data.offLineMsgCount > 0) {
                // 显示小红点
                that.handleRedDirSpot();
              }
            }
          }
        });
      } else {
        // 关闭轮询
        that.stopPolling(imInterval);
      }
    }, 10 * 1000);
  },
  /**
   * 是否满足开启轮询条件
   */
  startPolling: function() {
    // 离线消息数
    var offLineMsgCount = wx.getStorageSync("offLineMsgCount");
    // 当离线消息树大于0时，停止轮询
    if (offLineMsgCount > 0) {
      // 停止定时器
      return false;
    }
    return true;
  },
  /**
   * 停止轮询
   */
  stopPolling: function(imInterval) {
    clearInterval(imInterval);
    console.log("轮询已停止");
  },
  /**
   * 显示小红点
   */
  handleRedDirSpot: function() {
    wx.setTabBarItem({
      index: 1,
      text: '消息',
      iconPath: "resources/image/xiaoxi-d.png",
      selectedIconPath: "resources/image/xiaoxi-l.png"
    });
  }
})