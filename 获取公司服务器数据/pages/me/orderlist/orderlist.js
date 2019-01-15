// pages/me/orderlist/orderlist.js
var app = getApp();
var dialogAssistant = require("../../../Assistant/DialogAssistant.js")
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    show:false,
    dixian:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading();
    this.requestDppoint();
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
    * 取消预约
    */
  cancelClick: function (event) {
    that = this;
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxAppointTime/updateAppoint",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        dataType: "json",
        data: {
          openId: app.globalData.openId,
          id: event.currentTarget.dataset.item
        },
        complete: function (res) {
          if (res == null || res.data == null || res.data.code != "1") {
            // 请求失败
            dialogAssistant.showToast('网络请求失败')
          } else {
            that.showLoading();
            that.requestDppoint();
          }
        }
      })

    
  },
    /**
   * 请求预约列表
   */
  requestDppoint: function () {
    that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxAppointTime/getHouseAppointList",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        agentId: app.globalData.agentInfo.id
      },
      complete: function (res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          dialogAssistant.showToast('网络请求失败')
        } else {
          // 请求成功
			console.log(res.data)
        if (res.data.data.length>0){
				that.setData({
				list: res.data.data,
				selected: '',
				dixian:true
			  })
			}else{
				that.setData({
				list: res.data.data,
				selected: '',
				show:true
			  })
			}
		}
        that.dissmissLoading()
      }
    })
  },
    /**
   * Item点击事件
   */
  onItemClick: function (event) {
    var item = event.currentTarget.dataset.item
    if (item.status == 1 || item.status == -1 || item.status == 2) {
      wx.navigateTo({
        url: "../../houseDetail/HouseDetail?id=" + item.houseSourceId
      })
    } else if (item.status == 3) {
      wx.showToast({
        title: "该房源即将开盘，敬请期待！",
        icon: "none"
      })
    } else if (item.status == 4) {
      wx.showToast({
        title: "该房源已成交！",
        icon: "none"
      })
    }
  },
})