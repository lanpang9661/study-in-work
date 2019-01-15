var amapFile = require('../../../utils/amap-wx.js');
// 定义自身引用
var that
// 定义全局app实例
var app = getApp()
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  onLoad: function (options) {
    console.log("开始onLoad")
    console.log(options)

    that = this
    var key = app.globalData.gaodeMapAPIKey
    var myAmapFun = new amapFile.AMapWX({ key: key })

    // 从父界面获取数据
    that.setData({
      latitude: options.latitude,
      longitude: options.longitude
    })

    myAmapFun.getRegeo({
      iconPath: "../../../resources/image/iconLocation.png",
      iconWidth: 23,
      iconHeight: 23,
      location: that.data.longitude + "," + that.data.latitude,
      success: function (data) {
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  }
})