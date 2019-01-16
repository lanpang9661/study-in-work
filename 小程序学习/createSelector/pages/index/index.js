//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    top: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    const query = wx.createSelectorQuery();
    query.select('.box').boundingClientRect(function (res) {
      that.setData({
        top: res.top
      })
      console.log(that.data.top)
    })
    query.selectViewport().scrollOffset(function (res) {
      console.log(res.scrollTop)
    })
    query.exec()
  },
  btnTap: function(){
    // wx.showLoading({
    //   title: '加载中',
    // })
    
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })

    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })

    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
