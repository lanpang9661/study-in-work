//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isFixed: false,
    list: [
      {
        name: '首页',
        index: 0
      },
      {
        name: '菜单',
        index: 1
      },
      {
        name: '中文',
        index: 2
      },
      {
        name: '英文',
        index: 3
      },
      {
        name: '日语',
        index: 4
      },
      {
        name: '法语',
        index: 5
      }
    ],
    nowIndex: 0
  },
  onLoad: function () {

  },
  onPageScroll: function(e){
    if(e.scrollTop >= 200){
      this.setData({
        isFixed: true
      })
    }else{
      this.setData({
        isFixed: false
      })
    }
  },
  itemTap: function(e){
    // console.log(e.target.dataset.index)
    this.setData({
      nowIndex: e.target.dataset.index
    })
  }
})
