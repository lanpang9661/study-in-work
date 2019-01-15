
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 1,
    _num: '1',
    avatarUrl:'/resources/image/9.png',
    agentName:'',
    
    dayPage:{
      order: '--',
      mbean: 0,
      bottomShow:true,
      moreDataShow: false,
      noDataShow: true,
      currentPage: 1,
      rowCount: 10,
      dataList: null
    },
    weekPage:{
      order: '--',
      mbean: 0,
      bottomShow: true,
      moreDataShow: false,
      noDataShow: true,
      currentPage: 1,
      rowCount: 10,
      dataList: null
    },
    monthPage:{
      order: '--',
      mbean: 0,
      bottomShow: true,
      moreDataShow: false,
      noDataShow: true,
      currentPage: 1,
      rowCount: 10,
      dataList: null
    }
  },
  getPageObject:function (orderType){
    if (orderType == 0) {
      return this.data.dayPage;
    } else if (orderType == 1) {
      return this.data.weekPage;
    } else {
      return  this.data.monthPage;
    }
  },
  /** 
 * 点击tab切换 
 */
  toggle(e) {
    debugger
    if (this.data._num === e.currentTarget.dataset.index) {
      return false;
    } else {
      this.setData({
        _num: e.currentTarget.dataset.index
      })
    }
    if (e.currentTarget.dataset.index == 0 && this.data.dayPage.dataList != null){
      return ;
    } else if (e.currentTarget.dataset.index == 1 && this.data.weekPage.dataList != null) {
      return;
    } else if (e.currentTarget.dataset.index == 2 && this.data.monthPage.dataList != null) {
      return;
    }
    this.getPointsListOrder(e.currentTarget.dataset.index);
  },
  bindChange: function (e) {
    debugger
    var that = this;
    that.setData({
      _num: e.detail.current
    });
    switch (e.detail.current) {
      case 0:
        that.data.state = 0;
        break;
      case 1:
        that.data.state = 1;
        break;
      case 2:
        that.data.state = 2;
        break;
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var s =app.globalData.userInfo
    var b =app.globalData.agentInfo
    this.setData({
      avatarUrl: s.avatarUrl,
      agentName:b.agentName
    })
    this.getPointsListOrder(1,'refer');
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  loadMore:function (){
    this.getPointsListOrder(this.data._num, 'more');
  },
  /**
   * 获取排行
   */
  getPointsListOrder: function (orderType,selectType){
    var dataPage = this.getPageObject(orderType);
    if (dataPage.moreDataShow){
      return false;
    }
    if (selectType == 'more') {
      dataPage.currentPage += 1;
    } else {
      dataPage.currentPage = 1;
    }
    let that = this;
    wx.showLoading({
      title:'正在请求数据',
      success:function (){
        
      }
    });
    wx.request({
      //获取openid接口  
      url: app.globalData.baseUrl + '/xcx/points/getPointsListOrder',
      data: {
        openId: app.globalData.openId,
        agentId: app.globalData.agentInfo.id,
        cityCode:app.globalData.agentInfo.cityCode,
        orderType: orderType,
        currentPage: dataPage.currentPage,
        rowCount: dataPage.rowCount
      },
      dataType: "json",
      method: 'GET',
      complete: function (res3) {
        that.makePage(orderType, res3.data, dataPage,selectType);
        wx.hideLoading();
      }
    });
  },
  makePage: function (orderType, resultData, dataPage,selectType){
    let dataList = resultData.data.pointsListOrder.pagerResults;
    if (selectType == 'more') {
      if (dataList.length > 0) {
        dataPage.dataList = dataPage.dataList.concat(dataList);
      }
    }else{
      dataPage.dataList = dataList;
    }
    let ord = resultData.data.rowNo;
    let mb = resultData.data.mbeanTotal;
    if (!ord) {
      ord = '--'
    }
    if (!mb) {
      mb = 0;
    }
    dataPage.order = ord;
    dataPage.mbean = mb;
    //如果没有数据，则隐藏加载更多和底线，显示没数据
    if (resultData.data.pointsListOrder.totalCount == 0){
      dataPage.bottomShow = true;
      dataPage.moreDataShow = true;
      dataPage.noDataShow = false;
    }else if (dataList.length < 10){
      dataPage.bottomShow = false;
      dataPage.moreDataShow = true;
      dataPage.noDataShow = true;
    } else {
      dataPage.bottomShow = true;
      dataPage.moreDataShow = false;
      dataPage.noDataShow = true;
    }
    
    if (orderType == '0') {
      this.setData({
        dayPage: dataPage
      })
    } else if (orderType == '1') {
      this.setData({
        weekPage: dataPage
      })
    } else {
      this.setData({
        monthPage: dataPage
      })
    }

  }

})