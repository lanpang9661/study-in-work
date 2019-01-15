// pages/password/passwordRequest/LockRequest.js
// 定义自身引用指针
// 定义全局app实例
var app = getApp()
// 定义工具类
var smartLock = requirePlugin("smartLock");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseId: "",
    lockCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从父界面获取数据
    this.setData({
      houseId: options.houseId,
      lockCode: options.lockCode
    });
    this.initSmartLock();
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
   * 确定点击处理
   */
  insertTakeInfo: function (openId, houseId,agentId) {
    if (openId == null || houseId == null || agentId == null){
      return false;
    }
    // 请求申请开锁
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxTake/saveTake",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: openId,
        refHouseSourceId: houseId,
        refAgentId: agentId
      },
      complete: function (res) {
       
      }
    })
  },
  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  },
  initSmartLock:function (){
    smartLock.initSmartLock("DF4AD42A69324829AA3F5DD2126795C6", "0926865FE1864CC29D2142D17087B7F6", "13998426800", "jistar",
      function (res) {
        
      }
    )
  },
  /**
   * 扫描蓝牙门锁
   */
  openLock: function () {
    var that = this;
    smartLock.openCloseBleLock(that.data.lockCode, 1, function (res) {
      if (res.data.result == 0) {
        wx.showToast({ title: "门锁已打开" });
        that.insertTakeInfo(app.globalData.openId, that.data.houseId, app.globalData.agentInfo.id);
      } else {
        wx.showToast({ title: res.data.msg });
      }
    })
  },
  openLockByPwd:function (){
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxLock/getRequestPassword",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        houseSourceId: that.data.houseId
      },
      complete: function (res) {
        if (res == null || res.data == null || res.data.code != "1") {
          wx.showToast({
            title: "密码获取失败，请联工作人员！",
            icon: "none"
          })
        } else {
          that.openLockDetail(res.data.data)
        }
      }
    })
  },
  openLockDetail: function (id) {
    wx.redirectTo({
      url: "../../password/passwordDetail/index?id=" + id,
    })
  },
})