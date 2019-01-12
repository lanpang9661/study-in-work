//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    timing: 2000,
    preMar: '0',
    nextMar: '0',
    dotCheck: true,
    isAuto: false
  },
  changeProperty(e){
    this.setData({
      timing: e.detail.value
    })
  },
  preMarFn(e){
    this.setData({
      preMar: e.detail.value
    })
  },
  nextMarFn(e) {
    this.setData({
      nextMar: e.detail.value
    })
  },
  changeDotFn(e) {
    this.setData({
      dotCheck: e.detail.value
    })
  },
  changeAutoFn(e){
    this.setData({
      isAuto: e.detail.value
    })
  }
})