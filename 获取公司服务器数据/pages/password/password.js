// pages/password/password.js
// 定义自身引用指针
var that
// 定义全局app实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lockList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始onLoad")
    console.log(options)
    that = this
    // 从父界面获取数据
    that.setData({
    })
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
    // 每次回到这个界面重新请求一次数据
    that.showLoading()
    that.requestLockList()
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
   * 显示Toast
   */
  showToast: function (message) {
    var msg = ""
    if (message.length > 0) {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: "none"
    })
  },
  /**
   * 显示加载中
   */
  showLoading: function () {
    wx.showLoading({
      title: "数据加载中..",
      mask: true
    })
  },
  /**
   * 隐藏加载中
   */
  dissmissLoading: function () {
    wx.hideLoading()
  },
  /**
   * 请求开锁列表接口
   */
  requestLockList: function () {
    // 请求开锁列表
    wx.request({
      // url: "http://127.0.0.1/Weixin/lockList",
      url: app.globalData.baseUrl + "/xcx/xcxLock/getHouseLockPasswordList",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        agentId: app.globalData.agentInfo.id
      },
      complete: function (res) {
        console.log("请求完成")
        console.log(res.data)
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          console.error('网络请求失败');
          that.showToast('网络请求失败')
        }
        else {
          // 请求成功
          that.updateDataByResult(res.data)
        }
        that.dissmissLoading()
      }
    })
  },

  /**
   * 根据请求结果更新数据的方法
   */
  updateDataByResult: function (resultData) {
    // 生成新的列表
    var newLockList = []
    var resultList = resultData.data
    if (null != resultList) {
      for (var i = 0; i < resultList.length; i++) {
        var tempData = resultList[i]
        var newItem = {}
        newItem.imageUrl = tempData.imgUrl
        newItem.password = tempData.password
        newItem.shenqingTime = tempData.createDateStr
        newItem.houseDescription = tempData.estate
        newItem.id = tempData.id
        newLockList.push(newItem)
      }
      that.setData({
        lockList: newLockList
      })
    }
  },

  /**
   * Item的点击事件
   */
  onItemClick: function (itemData) {
    console.log("响应onItemClick()")
    console.log(itemData)
    console.log("以上为itemData")
    var item = itemData.currentTarget.dataset.item
    wx.navigateTo({
      url: "../password/passwordDetail/index?id=" + item.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function () {
    return require('../../utils/forwardConfig.js').default;
  }
})