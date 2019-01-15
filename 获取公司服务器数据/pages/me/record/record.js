// pages/me/record/record.js
// 定义自身引用指针
var that
// 定义全局app实例
var app = getApp()
const util = require('../../../utils/util.js')
var dialogAssistant = require("../../../Assistant/DialogAssistant.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 208,//删除按钮宽度单位（rpx）
    noMore: false,
    dataList: {},
    currentPage: 1,
    rowCount: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("开始onLoad")
    console.log(options)
    this.initEleWidth();
    that = this
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
    wx.showLoading()
    this.refresh()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },
  /**
   * 刷新的方法
   */
  refresh: function () {
    console.log("正在刷新...")
    this.data.noMore = false
    var that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxTake/infoList",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        currentPage: 1,
        rowCount: that.data.rowCount,
        agentId: app.globalData.agentInfo.id,
        openId: app.globalData.openId,
        xcx: "xcx"
      },

      complete: function (res) {

        wx.hideLoading()
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          util.toastError(res)
        } else {
          // 请求成功
          var resultList = res.data.data.pagerResults
          var end = (resultList.length < that.data.rowCount)
          that.setData({
            currentPage: 1,
            noMore: end
          })
          that.updateResultList(resultList)
        }
      }
    })
  },
  /**
   * 加载更多的方法
   */
  loadMore: function () {
    if (!that.data.noMore) {
      console.log("正在加载更多...")
      var tmp = that.data.dataList
      wx.request({
        url: app.globalData.baseUrl + "/xcx/xcxTake/infoList",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        dataType: "json",
        data: {
          currentPage: that.data.currentPage + 1,
          rowCount: that.data.rowCount,
          agentId: app.globalData.agentInfo.id,
          openId: app.globalData.openId,
          xcx: "xcx"
        },
        complete: function (res) {
          console.log("加载更多完成")
          console.log(res.data)
          if (res == null || res.data == null || res.data.code != "1") {
            // 请求失败
            util.toastError(res)
          } else {
            // 请求成功
            var resultList = res.data.data.pagerResults
            var end = (resultList.length < that.data.rowCount)
            that.setData({
              currentPage: res.data.data.currentPage,
              noMore: end
            })
            that.appendLoadMoreList(resultList)
          }
        }
      })
    }
  },

  /**
   * 处理加载更多的列表
   */
  appendLoadMoreList(resultList) {
    if (null != resultList) {
      that.setData({
        dataList: that.data.dataList.concat(resultList)
      })
    }
  },

  /**
   * 处理刷新结果列表的方法
   */
  updateResultList: function (resultList) {
    // 生成新的列表
    if (null != resultList) {
      that.setData({
        dataList: resultList
      })
    }
  },
  /**
   * Item点击方法
   */
  onItemClick: function (itemData) {
    var item = itemData.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../../houseDetail/HouseDetail?id=" + item.refHouseSourceId
    })
  },
   initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
   //获取元素自适应后的实际宽度
   getEleWidth: function (w) {
     var real = 0;
     try {
       var res = wx.getSystemInfoSync().windowWidth;
       var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
       // console.log(scale);
       real = Math.floor(res / scale);
       return real;
     } catch (e) {
       return false;
       // Do something when catch error
     }
   },
   touchS: function (e) {
     if (e.touches.length == 1) {
       this.setData({
         //设置触摸起始点水平方向位置
         startX: e.touches[0].clientX
       });
     }
   },
   touchM: function (e) {
     if (e.touches.length == 1) {
       //手指移动时水平方向位置
       var moveX = e.touches[0].clientX;
       //手指起始点位置与移动期间的差值
       var disX = this.data.startX - moveX;
       var delBtnWidth = this.data.delBtnWidth;
       var txtStyle = "";
       if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
         txtStyle = "left:0px";
       } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
         txtStyle = "left:-" + disX + "px";
         if (disX >= delBtnWidth) {
           //控制手指移动距离最大值为删除按钮的宽度
           txtStyle = "left:-" + delBtnWidth + "px";
         }
       }
       //获取手指触摸的是哪一项
       var index = e.currentTarget.dataset.index;
       var list = this.data.dataList;
       if (index >= 0) {
         list[index].txtStyle = txtStyle;
         //更新列表的状态
         this.setData({
           dataList: list
         });
       }
     }
   },

   touchE: function (e) {
     if (e.changedTouches.length == 1) {
       //手指移动结束后水平位置
       var endX = e.changedTouches[0].clientX;
       //触摸开始与结束，手指移动的距离
       var disX = this.data.startX - endX;
       var delBtnWidth = this.data.delBtnWidth;
       //如果距离小于删除按钮的1/2，不显示删除按钮
       var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
       //获取手指触摸的是哪一项
       var index = e.currentTarget.dataset.index;
       var list = this.data.dataList;
       if (index >= 0) {
         list[index].txtStyle = txtStyle;
         //更新列表的状态
         this.setData({
           dataList: list
         });
       }
     }
   },
   
  /**
   * 删除记录点击
   */
  onDeleteClick: function (itemData) {
    var item = itemData.currentTarget.dataset.item
    // 请求删除
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxTake/delTake",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        id: item.id,
        agentId: app.globalData.agentInfo.id,
        openId: app.globalData.openId,
      },
      complete: function (res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          util.toastError(res)
        } else {
          // 请求成功
          dialogAssistant.showToast("删除带看记录成功")
          wx.showLoading()
          that.refresh()
        }
      }
    })
   },
   onShareAppMessage: function () {
     return require('../../../utils/forwardConfig.js').default;
   }
})