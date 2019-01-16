//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    animationData: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    this.animation = animation;

    this.setData({
      animationData: animation.export()
    })
  },
  rotateFn:function(){
    this.animation.rotate(Math.random()*720).step()
    this.setData({animationData: this.animation.export()})
  },
  scaleFn: function () {
    this.animation.scale(Math.random() * 2).step()
    this.setData({ animationData: this.animation.export() })
  }
})
