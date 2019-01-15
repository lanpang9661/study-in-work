// pages/register/citylist/citylist.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:null,
    nowProvince: "",
    nowCity: "",
    nowCityCode: "",
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenCityList();
    var that = this;
    that.setData({
      showLoading: false
    })
    wx.getLocation({
      success: function (res) {
        let lat = res.latitude;
        let lng = res.longitude;
        that.makeCity(lat, lng);
      },
      fail: function (res3) {
        that.setData({
          nowCity: '未知',
          showLoading: true
        });
      }
    })
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
    //
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
  onShareAppMessage: function () {
    return require('../../../utils/forwardConfig.js').default;
  },
  getOpenCityList:function (){
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxOpenCity/getOpenCityList",
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
      dataType: "json",
      complete: function (res) {
        that.setData({
          cityList:res.data.data
        });
      }
    })
  },
  selectCity: function (event){
    var item = event.currentTarget.dataset.item;
    this.backPage(item.province, item.regname, item.regid);
  },
  userLocation:function (){

    var that = this;
    wx.getLocation({
      success: function (res) {
        let lat = res.latitude;
        let lng = res.longitude;
        that.makeCity(lat, lng);
      },
      fail: function (res3) {
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userLocation'] == false) {
              wx.showModal({
                title: '请求授权当前位置',
                content: '需要获取您的地理位置，请确认授权',
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: function (res) {
                        
                      }
                    })
                  }
                }
              })
            } 
          }
        })
      }
    })
    
  },
  makeCity: function (lat, lng) {
    let that = this;
    that.setData({
      showLoading: false
    })
    wx.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/xcxOpenCity/getLocalCity',
      data: {
        lat: lat,
        lng: lng
      },
      dataType: "json",
      method: 'GET',
      complete: function (res3) {
        let nowProvince = res3.data.nowProvince;
        let nowCity = res3.data.nowCity;
        let nowCityCode = res3.data.nowCityCode;
        let cityFlag = res3.data.cityFlag;
        if (cityFlag) {
          that.setData({
            nowProvince: nowProvince,
            nowCity: nowCity,
            nowCityCode: nowCityCode,
            showLoading:true,
            isNowCityOpen:true
          });
        }else{
          that.setData({
            nowProvince: nowProvince,
            nowCity: nowCity + '(暂未开通)',
            nowCityCode: nowCityCode,
            showLoading: true,
            isNowCityOpen:false
          });
        }
      }
    });
  },
  selectNowCity:function (){
    if (this.data.isNowCityOpen){
      this.backPage(this.data.nowProvince, this.data.nowCity, this.data.nowCityCode);
    }else{
      wx.showToast({
        title: this.data.nowCity+'尚未开通',
        icon:'none',
        duration: 2000
      })
    }
  },
  backPage: function (nowProvince, nowCity, nowCityCode){
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      nowProvince: nowProvince,
      nowCity: nowCity,
      nowCityCode: nowCityCode
    });
    wx.navigateBack({
      delta: 1
    })
  }
})