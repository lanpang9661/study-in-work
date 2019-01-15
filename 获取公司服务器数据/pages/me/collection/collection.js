// pages/me/collection/collection.js
var app = getApp()
const util = require('../../../utils/util.js')
var that
var dialogAssiatant = require("../../../Assistant/DialogAssistant.js")
// 定义String工具类
var stringAssistant = require('../../../Assistant/StringAssistant.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 208,//删除按钮宽度单位（rpx）
    list: {},
    // 是否显示成交奖标识
    isShowChengjiaojiang: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.fetch()
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
  fetch: function () {
    wx.showLoading({})
    this.data.noMore = false
    var that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/getXCXHouseSourceCollectForPage",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        currentPage: 1,
        rowCount: 500,
        collect: 1,
        agentId: app.globalData.agentInfo.id,
        openId: app.globalData.openId
      },
      complete: function (res) {
        console.log(res.data)
        wx.hideLoading()
        if (res == null || res.data == null || res.data.code != "1") {
          util.toastError(res)
        } else {
          var resultList = {}
          if (res.data.data && res.data.data.pagerResults) {
            resultList = res.data.data.pagerResults
          }
          for (var i = 0; i < resultList.length; i++) {
            if (resultList[i].features) {
              resultList[i].features = resultList[i].features.split(",");
            }
            // 重新设置是否是自营
            resultList[i].ziyingStatus = stringAssistant.nonNull(resultList[i].proprietary) + ""
            console.log("自营状态为:" + resultList[i].ziyingStatus)
            // 重新设置是否显示成交奖标志
            var newShowChengjiaojiang = false
            if (stringAssistant.isEmpty(resultList[i].redEnvelopeStr)) {
              newShowChengjiaojiang = false
            } else {
              if (resultList[i].redEnvelopeStr == "0") {
                newShowChengjiaojiang = false
              } else {
                newShowChengjiaojiang = true
              }
            }
            resultList[i].isShowChengjiaojiang = newShowChengjiaojiang

            // 重新设置图标状态
            var isNew = stringAssistant.nonNull(resultList[i].newIsFlag)
            if ("1" == isNew) {
              resultList[i].status = -1
            }

            // 设置是否显示预售状态
            var statusGet = stringAssistant.nonNull(resultList[i].status)
            console.log("Item的status为:")
            console.log(resultList[i].status)
            if (statusGet == "2") {
              console.log("要显示预售倒计时")
              resultList[i].showRemainTime = true
            } else {
              resultList[i].showRemainTime = false
            }

            // 设置预售开盘时间显示文字
            var yushouWenziDay = ""
            var yushouWenziUnit = ""
            var yushouWenziContent = ""
            var remainingTimeGet = stringAssistant.nonNull(resultList[i].remainingTime)
            if (remainingTimeGet <= 0) {
              yushouWenziDay = ""
              yushouWenziUnit = ""
              yushouWenziContent = stringAssistant.nonNull(resultList[i].remainingContent)
            } else {
              yushouWenziDay = stringAssistant.nonNull(resultList[i].remainingTime)
              yushouWenziUnit = stringAssistant.nonNull(resultList[i].remainingTimeStr)
              yushouWenziContent = stringAssistant.nonNull(resultList[i].remainingContent)
            }
            resultList[i].yushouWenziDay = yushouWenziDay
            resultList[i].yushouWenziUnit = yushouWenziUnit
            resultList[i].yushouWenziContent = yushouWenziContent

            // 设置佣金和红包显示文字
            var yongjinhongbao = ""
            var yongjin = ""
            var chengjiaojiangli = ""
            if (stringAssistant.isEmpty(resultList[i].hireMoneyStr)) {
              yongjin = ""
            } else {
              yongjin = "佣金" + resultList[i].hireMoneyStr + "%"
            }
            console.log(" yongjin is " + yongjin)
            if (stringAssistant.isEmpty(resultList[i].redEnvelopeStr) || stringAssistant.nonNull(resultList[i].redEnvelopeStr) == "0") {
              chengjiaojiangli = ""
            } else {
              if (!stringAssistant.isEmpty(yongjin)) {
                chengjiaojiangli = ", "
              }
              chengjiaojiangli = chengjiaojiangli + "成交奖励" + resultList[i].redEnvelopeStr
            }
            console.log(" chengjiaojiangli is " + chengjiaojiangli)
            yongjinhongbao = yongjin + chengjiaojiangli
            console.log(" yongjinhongbao is " + yongjinhongbao)
            resultList[i].yongjinhongbao = yongjinhongbao
          }
          that.setData({
            list: resultList,
          })
        }
      }
    })
  },

  /**
   * Item点击事件
   */
  onItemClick: function (event) {
    var item = event.currentTarget.dataset.item
    console.log(item)
    wx.navigateTo({
      url: "../../houseDetail/HouseDetail?id=" + item.id
    })
  },

  /**
   * 取消收藏点击
   */
  onCancelShowcangClick: function (itemData) {
    console.log("响应onDeleteClick()")
    console.log(itemData)
    console.log("以上为itemData")
    var item = itemData.currentTarget.dataset.item
    // 请求取消收藏
    dialogAssiatant.showLoading("取消收藏中..")
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouseCollect/save",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        houseSourceId: item.id,
        agentId: app.globalData.agentInfo.id
      },
      complete: function (res) {
        console.log("请求完成")
        console.log(res.data)
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          console.error('网络请求失败');
          dialogAssiatant.showToast('网络请求失败')
        } else {
          // 请求成功, 重新请求收藏列表
          that.fetch()
        }
      }
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
      var list = this.data.list;
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
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
      var list = this.data.list;
      console.log(e);
      if (index >= 0) {
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          list: list
        });
      }
    }
  },
  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  }
})