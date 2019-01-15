// pages/houseDetail/yuyue/yuyue.js
var app = getApp();
var dialogAssistant = require("../../../Assistant/DialogAssistant.js")
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    houseSourceId:'',
    selected:'',
    confirmBtn:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      houseSourceId: options.houseId
    })
    that.showLoading();
    that.requestDppoint();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 请求带看时间
   */
  requestDppoint: function () {
    that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxAppointTime/getAppointTimeList",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        houseSourceId: that.data.houseSourceId,
        agentId: app.globalData.agentInfo.id
      },
      complete: function (res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          dialogAssistant.showToast('网络请求失败')
        } else {
           // 请求成功
          console.log(res.data)
          that.setData({
            list: res.data.data,
            selected:''
          })
        }
        that.dissmissLoading()
      }
    })
  },
  /**
   * 点击选中
   */
  onItemClick:function (event){
    that = this;
    var selected = that.data.selected;
    var id = event.currentTarget.dataset.item.id;
    if (selected.indexOf(','+id+',')>-1){
      selected =selected.replace((','+id)+',',','); 
    }else{
      if (selected==""){
        selected = ',' + id+',';
      }else{
        selected = selected + id+',';
      }
    }
    that.setData({
      selected: selected
    })
    console.log(selected)
  },
    /**
     * 确认预约
     */
  confirmClick: function (event) {
    that = this;
    if (that.data.selected!=''){
     wx.request({
       url: app.globalData.baseUrl + "/xcx/xcxAppointTime/insertAppoint",
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       method: "POST",
       dataType: "json",
       data: {
         openId: app.globalData.openId,
         refAppointTimeId: that.data.selected,
         refAgentId: app.globalData.agentInfo.id,
         agentName: app.globalData.agentInfo.agentName,
         agentCompany: app.globalData.agentInfo.company,
         agentStore: app.globalData.agentInfo.storeName,
         status:1        
       },
       complete: function (res) {
         if (res == null || res.data == null || res.data.code != "1") {
           // 请求失败
           dialogAssistant.showToast('网络请求失败')
         } else {
           // 请求成功
           that.setData({
             list: res.data.data
           })
           that.showLoading();
           that.requestDppoint();
           that.setData({
             confirmBtn: 1,
             selected:''
           })
         }
       }
     })
    }else{
      dialogAssistant.showToast('请选择预约时间！');
    }
  }
   /**
     * 确认预约提示关闭
     */
  ,closeClick: function (event) {
    that.setData({
      confirmBtn:0
    })
  }
})