var app = getApp()
const util = require('../../../utils/util.js')
var dialogAssiatant = require("../../../Assistant/DialogAssistant.js")
// 定义String工具类
var stringAssistant = require('../../../Assistant/StringAssistant.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    rowCount: 10,
    list: [],
    more: true,
    end: true,
    noData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
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
    var that = this;
    var tmp = that.data.list;
    if (that.data.end) {
      that.setData({
        more: false,
        currentPage: that.data.currentPage + 1,
      }, () => {
        if (!that.data.more) {
          wx.request({
            url: app.globalData.baseUrl + "/xcx/xcxHouseClick/getHouseClickForPage",
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            dataType: "json",
            data: {
              currentPage: that.data.currentPage,
              rowCount: that.data.rowCount,
              agentId: app.globalData.agentInfo.id,
              openId: app.globalData.openId
            },
            complete: function (res) {
              if (res) {
                var resultList = res.data.data.pagerResults;
                if (resultList.length > 0) {
                  var end = resultList.length < that.data.rowCount;
                  var resultList = that.handleData(resultList);
                  that.setData({
                    list: tmp.concat(resultList),
                    more: true,
                    end: !end,
                    noData: true
                  });
                } else {
                  that.setData({
                    more: true,
                    end: false,
                    noData: false
                  });
                }
              }
            }
          });
        }
      });
    }
  },

  init: function () {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouseClick/getHouseClickForPage",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        currentPage: that.data.currentPage,
        rowCount: that.data.rowCount,
        agentId: app.globalData.agentInfo.id,
        openId: app.globalData.openId
      },
      complete: function (res) {
        if (res) {
          var resultList = res.data.data.pagerResults;
          if (resultList.length > 0) {
            var end = resultList.length < that.data.rowCount;
            that.setData({
              list: that.handleData(resultList),
              end: !end
            });
          } else {
            that.setData({
              noData: false
            });
          }
        }
      }
    });
  },

  handleData: function (resultList){
    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i].features) {
        resultList[i].features = resultList[i].features.split(",");
      }
      // 重新设置是否是自营
      resultList[i].ziyingStatus = stringAssistant.nonNull(resultList[i].proprietary) + ""
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
      if (statusGet == "2") {
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
      if (stringAssistant.isEmpty(resultList[i].redEnvelopeStr) || stringAssistant.nonNull(resultList[i].redEnvelopeStr) == "0") {
        chengjiaojiangli = ""
      } else {
        if (!stringAssistant.isEmpty(yongjin)) {
          chengjiaojiangli = ", "
        }
        chengjiaojiangli = chengjiaojiangli + "成交奖励" + resultList[i].redEnvelopeStr
      }
      yongjinhongbao = yongjin + chengjiaojiangli
      resultList[i].yongjinhongbao = yongjinhongbao
    }
    return resultList;
  },

  /**
   * Item点击事件
   */
  onItemClick: function (event) {
    var item = event.currentTarget.dataset.item;
    if (item.upDown == 2) {
      wx.showToast({
        title: '房源已经下架了',
        icon: 'none'
      });
      return false;
    }
    wx.navigateTo({
      url: "../../houseDetail/HouseDetail?id=" + item.id
    });
  },

  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  }
})