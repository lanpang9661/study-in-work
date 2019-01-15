var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [], //[{id:xxx,address:xxx}]
    searchInput: '',
    houseId: '',
    historyStorage: [], //[{houseSourceId:xxx,address:xxx}]
    history: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //从上一页面跳转来的数据默认显示在搜索框中
    var searchData = JSON.parse(options.searchData);
    var houseSourceId = searchData.houseSourceId;
    var address = searchData.address;
    var history = true;
    var searchList = [];
    if (address != '') { //有具体房源id，下拉中只显示该房源
      if (houseSourceId != '') {
        that.setData({
          searchList: [{
            id: houseSourceId,
            address: address
          }],
          searchInput: address,
          history: true
        });
      } else { //无具体房源id，根据字符串匹配
        //请求下拉数据
        wx.request({
          url: app.globalData.baseUrl + "/xcx/xcxHouse/getHouseListByMatch",
          header: {
            "Content-Type": "application/json"
          },
          method: "GET",
          dataType: "json",
          data: {
            matchStr: address,
            openId: app.globalData.openId
          },
          success:function(res){
            if (res.data.length > 0) {
              that.setData({
                searchList: res.data,
                searchInput: address,
                history: true
              });
            } else {
              that.setData({
                searchList: [],
                searchInput: address,
                history: that.data.historyStorage.length > 0 ? false : true
              });
            }
          },
          fail:function(res){
            that.showToast('网络请求失败');
          }
        });
      }
      //获取缓存历史数据
      wx.getStorage({
        key: 'xcx_houseListSearch',
        success: function (res) {
          that.setData({
            historyStorage: res.data
          });
        }
      });
    } else {
      //获取缓存历史数据
      wx.getStorage({
        key: 'xcx_houseListSearch',
        success: function (res) {
          that.setData({
            historyStorage: res.data,
            history: false
          });
        }
      });
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return require('../../utils/forwardConfig.js').default;
  },

  /**
   * 输入搜索条件
   */
  bindSearchInput: function (res) {
    var that = this;
    var value = res.detail.value;
    that.setData({
      searchInput: value
    }, () => {
      if (value != '') {
        //请求下拉数据
        wx.request({
          url: app.globalData.baseUrl + "/xcx/xcxHouse/getHouseListByMatch",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "GET",
          dataType: "json",
          data: {
            matchStr: value,
            openId: app.globalData.openId
          },
          success: function (res) {
            if (res.data.length > 0) {
              that.setData({
                searchList: res.data,
                history: true
              });
            } else {
              that.setData({
                searchList: [],
                history: that.data.historyStorage.length > 0 ? false : true
              });
            }
          },
          fail: function (res) {
            that.showToast('网络请求失败')
          }
        });
      } else {
        that.setData({
          searchList: [],
          history: that.data.historyStorage.length > 0 ? false : true
        });
      }
    });
  },

  /**
   * 选择某条数据，将数据存入缓存，并回退至上一页通过houseSourceId精确查询选择的房源
   */
  bindSelected: function (event) {
    var that = this;
    var item = event.currentTarget.dataset.item;
    var id = item.id;
    var address = item.address;
    that.setData({
      houseId: id,
      searchInput: address
    }, () => {
      //将选择的数据存入缓存
      that.setSearchStorage(id, address);
      //回退至上一页
      that.prevPage(id, address);
    });
  },

  /**
   * 将搜索数据存入缓存
   */
  setSearchStorage: function (houseSourceId, address) {
    var that = this;
    if (address != '') {
      var stotageList = [];
      wx.getStorage({
        key: 'xcx_houseListSearch',
        success: function (res) {
          stotageList = res.data;
        },
        complete: function (res) {
          stotageList.push({
            houseSourceId: houseSourceId,
            address: address
          });
          that.setData({
            historyStorage: stotageList,
            history: false
          });
          wx.setStorage({
            key: 'xcx_houseListSearch',
            data: stotageList
          });
        }
      });
    }
  },

  /**
   * 取消，清空搜索条件，并回退至上一页刷新列表
   */
  cancel: function () {
    this.setData({
      searchInput: ''
    }, () => {
      this.prevPage('', '');
    });
  },

  /**
   * 删除历史记录
   */
  delHistory: function () {
    var that = this;
    wx.removeStorage({
      key: 'xcx_houseListSearch',
      success(res) {
        that.setData({
          historyStorage: [],
          history: true
        });
      }
    });
  },

  /**
   * 点击历史记录，回退至上一页并查询对应房源
   */
  clickHistory: function (event) {
    var item = event.currentTarget.dataset.item;
    this.prevPage(item.houseSourceId, item.address);
  },

  /**
   * 搜索框的回车事件，回退至上一页并通过字符串模糊匹配房源
   */
  bindSearchConfirm: function () {
    var searchInput = this.data.searchInput;
    this.setSearchStorage('', searchInput);
    this.prevPage('', searchInput);
  },

  /**
   * 回退至上一页
   */
  prevPage: function (houseSourceId, address) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      'searchData.flag': true,
      'searchData.houseSourceId': houseSourceId,
      'searchData.address': address,
      'searchData.skip': 1
    });
    wx.navigateBack({
      delta: 1
    });
  }
});