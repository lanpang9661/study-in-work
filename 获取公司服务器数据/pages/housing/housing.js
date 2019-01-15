// pages/housing/housing.js
var app = getApp()
const util = require('../../utils/util.js')
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
// 定义对话框工具类
var dialogAssistant = require("../../Assistant/DialogAssistant.js")
// 定义自身引用指针
var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchData: { //从搜索页带过来的数据
      flag: false,
      houseSourceId: '',
      address: '',
      skip: 1 //标记是从搜索页面跳转过来的
    },
    searchShow: false,
    redEvelopeShow: 'block',
    noMore: false,
    filterNone: false,
    list: {},
    currentPage: 1,
    rowCount: 10,
    kTitles: ["位置", "筛选", "智能排序", "更多"],
    searchListStyle: "",
    searchListStyleZhan: "display:none",
    searchListTouch: 0,
    searchSelected: 3,
    cityAreaList: [],
    areaCode:"",
    regionList: [{ name: '不限', regionId:''}],
    cityAreaCheck: 0,
    intelligenceSortCheck: 0,
    //regionCheck:[],
    //------筛选搜索选项
    //特色
    featuresList: [{
        title: "新装房",
        key: "proprietary",
        value:'1,2',
        status: 0
      },
      {
        title: "智能锁",
        value: 2,
        key: 'lookHouseType',
        
      },
      {
        title: "独家房源",
        key:"proprietary",
        status: 0,
        value:4
      },
      {
        title: "额外奖励",
        status: 0,
        key: 'extra',
        value:'extra'
      },
      {
        title: "有钥匙",
        status: 0,
        key: 'lookHouseType',
        value: 4
      },
      {
        title: "学区房",
        status: 0,
        key: 'features'
      },/**
      {
        title: "满2年",
        status: 0
      },
      {
        title: "满5唯一",
        status: 0
      }, */
      {
        title: "7日上新",
        status: 0,
        key:'sevenDayNew',
        value: 'sevenDayNew'
      },
      {
        title: "最新降价",
        status: 0,
        key:'depreciate',
        value: 'depreciate'
      },
      {
        title: "无贷款",
        status: 0,
        key: 'features',
        value: 'features'
      },
      {
        title: "地铁房",
        status: 0,
        key: 'features',
        value: 'features'
      }
    ],
    modelList: [{
          title: "一室",
          value: "0-1",
          status: 0
        },
        {
          title: "二室",
          value: "1-2",
          status: 0
        },
        {
          title: "三室",
          value: "2-3",
          status: 0
        },
        {
          title: "四室",
          value: "3-4",
          status: 0
        },
        {
          title: "五室",
          value: "4-5",
          status: 0
        },
        {
          title: "五室以上",
          value: "5-10",
          status: 0
        },
    ],
    areaList: [
        {
          title: "50平以下",
          value: "0-50",
          status: 0
        },
        {
          title: "50-70平",
          value: "50-70",
          status: 0
        },
        {
          title: "70-90平",
          value: "70-90", 
          status: 0
        },
        {
          title: "90-110平",
          value: "90-110",
          status: 0
        },
        {
          title: "110-130平",
          value: "110-130",
          status: 0
        },
        {
          title: "130-150平",
          value: "130-150",
          status: 0
        },
        {
          title: "150-200平",
          value: "150-200",
          status: 0
        },
        {
          title: "200平以上",
          value: "200-10000",
          status: 0
        }
    ],
    priceList: [{
          title: "40万以下",
          value: "0-40",
          status: 0
        },
        {
          title: "40-60万",
          value: "40-60",
          status: 0
        },
        {
          title: "60-80万",
          value: "60-80",
          status: 0
        },
        {
          title: "80-100万",
          value: "80-100",
          status: 0
        },
        {
          title: "100-150万",
          value: "100-150",
          status: 0
        },
        {
          title: "150-200万",
          value: "150-200",
          status: 0
        },
        {
          title: "200万以上",
          value: "200-10000",
          status: 0
        }
    ],
    //两税承担
    taxesFeesList: [{
        title: "卖家承担",
        value: 1,
        status: 0
      },
      {
        title: "买家承担",
        value: 2,
        status: 0
      },
      {
        title: "双方承担",
        value: 3,
        status: 0
      }
    ],
    //梯户
    ladderHouseholdList: [{
        title: "独立电梯",
        value: "0-40",
        status: 0
      },
      {
        title: "一梯两户",
        value: "40-60",
        status: 0
      },
      {
        title: "一梯三户",
        value: "60-80",
        status: 0
      }
    ],
    //位置
    locationList: [{
        title: "小区中心",
        value: "0-40",
        status: 0
      },
      {
        title: "远离马路",
        value: "40-60",
        status: 0
      },
      {
        title: "位置安静",
        value: "60-80",
        status: 0
        },
        {
          title: "近入口",
          value: "60-80",
          status: 0
        }
    ],
    //更多卖点
    moreSellingPointList: [
      {
        title: "景观房",
        value: "0-40",
        status: 0
      },
      {
        title: "曾露台",
        value: "40-60",
        status: 0
      },
      {
        title: "带车库",
        value: "60-80",
        status: 0
      },
      {
        title: "带花园",
        value: "60-80",
        status: 0
        }, {
          title: "送家电",
          value: "0-40",
          status: 0
        },
        {
          title: "有户口",
          value: "40-60",
          status: 0
        },
        {
          title: "全南户型",
          value: "60-80",
          status: 0
        },
        {
          title: "南北通透",
          value: "60-80",
          status: 0
        },
        {
          title: "卫浴全明",
          value: "60-80",
          status: 0
        },
        {
          title: "大开间",
          value: "60-80",
          status: 0
        },
        {
          title: "拎包入住",
          value: "60-80",
          status: 0
        }  
    ],
      priceMin: "",
      priceMax: "",
      areaMin: "",
      areaMax: "",

    //------------智能排序---------------------------
      
    intelligenceSortList:[
        {
          title: "智能排序",
          value: 1,
          status: 1
        }, {
          title: "时间最新",
          value: 2,
          status: 0
        }, {
          title: "距离最近",
          value: 3,
          status: 0
        }, {
          title: "人气最高",
          value: 4,
          status: 0
        }, {
          title: "面积从大到小",
          value: 5,
          status: 0
        }, {
          title: "面积从小到大",
          value: 6,
          status: 0
        }, {
          title: "单价从高到低",
          value: 7,
          status: 0
        }, {
          title: "单价从低到高",
          value: 8,
          status: 0
        }, {
          title: "总价从高到低",
          value: 9,
          status: 0
        }, {
          title: "总价从低到高",
          value: 10,
          status: 0
        }
    ],

    //----更多-------------------------
    //房源状态
    statusList: [{
        title: "在售",
        value: 1,
        status: 0
      }, {
        title: "即将开盘",
          value: 3,
          status: 0
      }, {
        title: "预售",
          value: 2,
          status: 0
    }],
    //朝向
    towardList: [{
        title: "南北",
        value: 1,
        status: 0
      },
      {
        title: "东南北",
        value: 2,
        status: 0
      },
      {
        title: "西南北",
        value: 3,
        status: 0
      },
      {
        title: "南",
        value: 4,
        status: 0
      },
      {
        title: "西",
        value: 5,
        status: 0
      },
      {
        title: "北",
        value: 6,
        status: 0
      },
      {
        title: "东南",
        value: 7,
        status: 0
      },
      {
        title: "西南",
        value: 8,
        status: 0
      },
      {
        title: "西北",
        value: 9,
        status: 0
      },
      {
        title: "东北",
        value: 10,
        status: 0
      },
      {
        title: "东",
        value: 11,
        status: 0
      },
      {
        title: "东西",
        value: 12,
        status: 0
      }
    ],
    //房屋类型
    houseTypeList: [{
        title: "高层",
        value: 1,
        status: 0
      },
      {
        title: "小高层",
        value: 2,
        status: 0
      },
      {
        title: "多层",
        value: 3,
        status: 0
      },
      {
        title: "多层复式",
        value: 4,
        status: 0
      },
      {
        title: "高层复式",
        value: 5,
        status: 0
      },
      {
        title: "多层跃式",
        value: 6,
        status: 0
      },
      {
        title: "高层跃式",
        value: 7,
        status: 0
      },
      {
        title: "独立别墅",
        value: 8,
        status: 0
      },
      {
        title: "连体别墅",
        value: 9,
        status: 0
      },
      {
        title: "双拼别墅",
        value: 10,
        status: 0
      },
      {
        title: "四核院",
        value: 11,
        status: 0
      },
      {
        title: "裙楼",
        value: 12,
        status: 0
      }
    ],
    //装修 1精装 2豪装 3中装 4简装 5毛坯
    decorationList: [{
        title: "精装",
        value: 1,
        status: 0
      }, {
        title: "豪装",
          value: 2,
          status: 0
      }, {
        title: "中装",
          value: 3,
          status: 0
      }, {
        title: "简装",
          value: 4,
          status: 0
      }, {
        title: "毛坯",
          value: 5,
          status: 0
    }],
    //房屋用途
    purposeList: [{
        title: "住宅",
        value: 1,
        status: 0
      }, {
        title: "别墅",
          value: 2,
          status: 0
      }, {
        title: "商铺",
          value: 3,
          status: 0
      }, {
        title: "写字楼",
          value: 4,
          status: 0
      }, {
        title: "车位",
          value: 5,
          status: 0
      },{
          title: "公寓",
          value: 6,
          status: 0
      },
      {
          title: "公建",
        value: 7,
        status: 0
        }
    ],
      //产权 1-产权;2-使用权;3-军产;4-地产;5-合同发票;6-回签手续
    propertyList: [{
        title: "产权",
        value: 1,
        status: 0
      }, {
        title: "使用权",
          value: 2,
          status: 0
      }, {
        title: "军产",
          value: 3,
          status: 0
      }, {
        title: "地产",
          value: 4,
          status: 0
      }, {
        title: "合同发票",
          value: 5,
          status: 0
      }, {
        title: "回迁手续",
          value: 6,
          status: 0
    }],
    // 是否显示成交奖标识
    isShowChengjiaojiang: true,
    // 喜报滚动标签相关数据
    showXibao: false,
    xibaoText: "",
    xibaofixed: true,
  },
  isos: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    var res = wx.getSystemInfoSync();
    this.isos = res.platform.indexOf("ios") > -1;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refresh(1);
  },
  onPageScroll: function({scrollTop}) {
    //安卓不用这么操作
    if (!this.isos) return;
    if (scrollTop <= 0) {
      if (this.data.xibaofixed) {
        this.setData({
          xibaofixed: false
        })
      }
    } else {
      if (!this.data.xibaofixed) {
        this.setData({
          xibaofixed: true
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 先请求喜报
    dialogAssistant.showLoading()
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxSysSet/getSysSet",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        cityCode: app.globalData.agentInfo.cityCode
      },
      complete: function(res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          dialogAssistant.showToast('网络请求失败')
        } else {
          try {
            app.globalData.fxjs = res.data.data.sysSet.fxjs
          } catch (err) {
          }
        }
        dialogAssistant.dissmissLoading()
      }
    })
    var that = this
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/getAreaList",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        cityCode: app.globalData.agentInfo.cityCode
      },
      complete: function(res) {
        console.log(app.globalData.openId);
        console.log(app.globalData.agentInfo.cityCode);
        var emptyItem = new Object()
        emptyItem.areaCode = ""
        emptyItem.name = "不限"
        var tmp = [emptyItem]
        that.setData({
          cityAreaList: tmp.concat(res.data)
        })
        // that.refresh()
        wx.startPullDownRefresh()

        console.log(that.data.cityAreaList) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.searchData.flag && this.data.searchData.skip == 1) {
      this.refresh(1);
    }
    // app.triggerSocket();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.noMore) {
      this.refresh(2)
    }
  },

  /**
   * Item点击事件
   */
  onItemClick: function(event) {
    var item = event.currentTarget.dataset.item;
    if (item.status == 1 || item.status == -1 || item.status == 2) {
      wx.navigateTo({
        url: "../houseDetail/HouseDetail?id=" + item.id
      })
    } else if (item.status == 3) {
      wx.showToast({
        title: "该房源即将开盘，敬请期待！",
        icon: "none"
      })
    } else if (item.status == 4) {
      wx.showToast({
        title: "该房源已成交！",
        icon: "none"
      })
    }
  },

  refresh: function(way) {
    var that = this;
    if (way == 1) {
      that.setData({
        currentPage: 1
      })
    } else {
      that.setData({
        currentPage: that.data.currentPage + 1
      })
    }
    this.data.noMore = false;
    var houseSourceId = this.data.searchData.houseSourceId;
    var address = this.data.searchData.address;
    var param = {
      currentPage: that.data.currentPage,
      rowCount: that.data.rowCount,
      openId: app.globalData.openId,
      agentId: app.globalData.agentInfo.id,
      houseSourceId: houseSourceId, //搜索条件
      address: houseSourceId == '' ? address : '', //搜索条件
    }
    var index = parseInt(that.data.searchListTouch);
    var searchSelected = parseInt(that.data.searchSelected);
    if (index > 0){
      param = that.getConditions(index);
    }
    if (searchSelected > 0) {
      param = that.getConditions(searchSelected);
    }

    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/getXCXHouseSourceForPage?openId=" + param.openId,
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      dataType: "json",
      data: param,
      complete: function(res) {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          util.toastError(res)
        } else {
          // 请求成功
          var resultList = res.data.data.pagerResults
          console.log(resultList)

          if(way == 1){
            var end = (that.data.list.length < that.data.rowCount)
            var none = (res.data.data.flag == 2)
            that.setData({
              list: resultList,
              noMore: end,
              filterNone: none,
            })
          } else {
            var end = (resultList.length < that.data.rowCount)
            that.setData({
              list: that.data.list.concat(resultList),
              noMore: end,
            })
          }
        }

        console.log(that.data.list)
      }
    })
  },
  //导航栏点击时间
  searchListTouchFn: function(e) {
    var index = e.currentTarget.id.replace("searchListTap_", "")
    index = parseInt(index);
    var tmp = index;
    if (this.data.searchListTouch == index) {
      tmp = 0;
      this.refresh(1);
    }
    if (this.data.searchSelected != index) {
      this.clearAll();
    }
    this.setData({
      searchListTouch: tmp,
      searchShow: (tmp == 0 || this.data.searchListTouch == 0) ? !that.data.searchShow : that.data.searchShow,
      searchSelected: 0
    })
    console.log(this.data.searchListTouch)
  
  },
  searchListMask: function() {
    this.setData({
      searchListTouch: 0,
      searchShow: !this.data.searchShow
    })
  },

  cityAreaChange: function(e) {//区域
    var index = e.currentTarget.dataset.index
    var tmp = index
    if (index == this.data.cityAreaCheck) {
      tmp = 0
    }
    this.setData({
      cityAreaCheck: tmp,
    })
    if (tmp = 0){
      that.setData({
        areaCode: '',
        regionList: []
      })
    }else{
      var location = this.data.cityAreaList[this.data.cityAreaCheck]
      that.setData({
        areaCode: location.areaCode
      })
      this.getRegion(location.areaCode);
    }
    
  },
  getRegion: function (areaCode) {//商圈选中 areaCode代表区域的编号
    console.log(app.globalData.openId)
    console.log(areaCode)
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/getRegionList",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        areaId: areaCode
      },
      complete: function (res) {
        var emptyItem = new Object()
        emptyItem.id = ""
        emptyItem.name = "不限"
        var tmp = [emptyItem]
        that.setData({
          regionList: tmp.concat(res.data)
        })
        console.log(that.data.regionList)
      }
    })
  }, 
  regionChange: function (e) {//商圈选中
      var index = e.currentTarget.dataset.index;
      var regionList = that.data.regionList;
      //var regionArray  = that.data.regionCheck;
      if (regionList[index].isflag == 1) {
          regionList[index].isflag = 0;
         // regionArray = this.removeRegion(regionArray,index);
        } else {
          regionList[index].isflag = 1;
          //regionArray.push(index);
        }
      that.setData({
        //regionArray: regionArray,
        regionList: regionList
      })
  },//删除商圈下表
/** 
  removeRegion: function (regionArray,index){
    var array = [];
    for (var i = 0; i < regionArray.length;i++){
      if(regionArray[i]!=index){
        array.push(regionArray[i]);
      }
    }
    return array;
  },
*/
  //筛选
  //选中特色
  featuresChange:function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var featuresList = that.data.featuresList;
    if (that.data.featuresList[index].status==1){
      that.data.featuresList[index].status = 2;
    }else{
      that.data.featuresList[index].status = 1;
    }
    that.setData({
      featuresList: featuresList
    })
  },//选中户型
  modelChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var modelList = that.data.modelList;
    if (that.data.modelList[index].status == 1) {
      that.data.modelList[index].status = 2;
    } else {
      that.data.modelList[index].status = 1;
    }
    that.setData({
      modelList: modelList
    })
  },
   // -----------选中面积和价钱选中-----------------------
  areaChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var areaList = that.data.areaList;
    if (that.data.areaList[index].status == 1) {
      that.data.areaList[index].status = 2;
    } else {
      that.data.areaList[index].status = 1;
    }
    that.setData({
      areaList: areaList
    })
  },
  priceMinInput: function (e) {
    this.setData({
      priceMin: e.detail.value     
    })
  },
  priceMaxInput: function (e) {
    this.setData({
      priceMax: e.detail.value
    })
  },
  areaMinInput: function (e) {
    this.setData({
      areaMin: e.detail.value
    })
  },
  areaMaxInput: function (e) {
    this.setData({
      areaMax: e.detail.value
    })
  },
  priceChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var priceList = that.data.priceList;
    if (that.data.priceList[index].status == 1) {
      that.data.priceList[index].status = 2;
    } else {
      that.data.priceList[index].status = 1;
    }
    that.setData({
      priceList: priceList
    })
  },
  //------选中智能排序
  intelligenceSortChange: function (e) {
    var index = e.currentTarget.dataset.index
    var tmp = index
    if (index == this.data.intelligenceSortCheck) {
      tmp = 0
    }
    this.setData({
      intelligenceSortCheck: tmp,
    })
    var intelligenceSort ="";
    if (tmp > 0){
         intelligenceSort = this.data.intelligenceSortList[this.data.intelligenceSortCheck]
    }

    that.setData({
      intelligenceSort: intelligenceSort
    })
  },
  //-------更多--------------------
  // 房源状态
  statusChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var statusList = that.data.statusList;
    if (that.data.statusList[index].status == 1) {
      that.data.statusList[index].status = 2;
    } else {
      that.data.statusList[index].status = 1;
    }
    that.setData({
      statusList: statusList
    })
  },
  //朝向
  towardChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var towardList = that.data.towardList;
    if (that.data.towardList[index].status == 1) {
      that.data.towardList[index].status = 2;
    } else {
      that.data.towardList[index].status = 1;
    }
    that.setData({
      towardList: towardList
    })
  },//户型
  houseTypeChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var houseTypeList = that.data.houseTypeList;
    if (that.data.houseTypeList[index].status == 1) {
      that.data.houseTypeList[index].status = 2;
    } else {
      that.data.houseTypeList[index].status = 1;
    }
    that.setData({
      houseTypeList: houseTypeList
    })
  },
  //产权
  propertyChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var propertyList = that.data.propertyList;
    if (that.data.propertyList[index].status == 1) {
      that.data.propertyList[index].status = 2;
    } else {
      that.data.propertyList[index].status = 1;
    }
    that.setData({
      propertyList: propertyList
    })
  },
  //装修
  decorationChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var decorationList = that.data.decorationList;
    if (that.data.decorationList[index].status == 1) {
      that.data.decorationList[index].status = 2;
    } else {
      that.data.decorationList[index].status = 1;
    }
    that.setData({
      decorationList: decorationList
    })
  },
  //房屋用途
  purposeChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var purposeList = that.data.purposeList;
    if (that.data.purposeList[index].status == 1) {
      that.data.purposeList[index].status = 2;
    } else {
      that.data.purposeList[index].status = 1;
    }
    that.setData({
      purposeList: purposeList
    })
  },
  //两税承担
  taxesFeesChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var taxesFeesList = that.data.taxesFeesList;
    if (that.data.taxesFeesList[index].status == 1) {
      that.data.taxesFeesList[index].status = 2;
    } else {
      that.data.taxesFeesList[index].status = 1;
    }
    that.setData({
      taxesFeesList: taxesFeesList
    })
  },
  //两税承担
  taxesFeesChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var taxesFeesList = that.data.taxesFeesList;
    if (that.data.taxesFeesList[index].status == 1) {
      that.data.taxesFeesList[index].status = 2;
    } else {
      that.data.taxesFeesList[index].status = 1;
    }
    that.setData({
      taxesFeesList: taxesFeesList
    })
  },
  //梯户
  ladderHouseholdChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var ladderHouseholdList = that.data.ladderHouseholdList;
    if (that.data.ladderHouseholdList[index].status == 1) {
      that.data.ladderHouseholdList[index].status = 2;
    } else {
      that.data.ladderHouseholdList[index].status = 1;
    }
    that.setData({
      ladderHouseholdList: ladderHouseholdList
    })
  },
  //位置
  locationChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var locationList = that.data.locationList;
    if (that.data.locationList[index].status == 1) {
      that.data.locationList[index].status = 2;
    } else {
      that.data.locationList[index].status = 1;
    }
    that.setData({
      locationList: locationList
    })
  },
 
  //更多买点
   moreSellingPointChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var moreSellingPointList = that.data.moreSellingPointList;
    if (that.data.moreSellingPointList[index].status == 1) {
      that.data.moreSellingPointList[index].status = 2;
    } else {
      that.data.moreSellingPointList[index].status = 1;
    }
    that.setData({
      moreSellingPointList: moreSellingPointList
    })
  }, 
  submit:function(){
    that = this;
    var index = that.data.searchListTouch;
    wx.showLoading()
    that.refresh(1)
    this.setData({
      searchListTouch: 0,
      searchShow: !that.data.searchShow,
      searchSelected: index
    })
    //that.clearAll();
  },
  //获取搜索条件
  getConditions: function (index){
    that = this;
    //搜索条件必填项
    var houseSourceId = this.data.searchData.houseSourceId;
    var address = this.data.searchData.address;
    var data = {};
    data.currentPage = that.data.currentPage;
    data.rowCount = that.data.rowCount;
    data.openId = app.globalData.openId;
    data.agentId = app.globalData.agentInfo.id;
    data.cityCode = app.globalData.agentInfo.cityCode
    data.houseSourceId = houseSourceId; //搜索条件
    data.address = houseSourceId == '' ? address: ''; //搜索条件
    //选中位置时搜素
    if (index == 1) {//位置
      var regionListArray = [];
      var regionList = that.data.regionList;
      var regionId = '';
      //获取商圈
      for (var i = 0; i < regionList.length; i++) {
        if (regionList[i].isflag == 1) {
          regionListArray.push(regionList[i].id)
        }
      }
      if (regionListArray.length > 0) {
        regionId = regionListArray.join(",")
      }
      data.areaCode = that.data.areaCode;
      data.regionId = regionId;
    } else if (index == 2) {//筛选
      var features = "";
      var featuresArray = [];
      var featuresList = that.data.featuresList;
      var lookHouseType = ""
      var lookHouseTypeArray = [];
      var proprietaryArray = [];
      var proprietary = "";
      //获取选中特色
      for (var i = 0; i < featuresList.length; i++) {
        if (featuresList[i].status == 1) {
          if (featuresList[i].key == 'features') {
            featuresArray.push(featuresList[i].title);
          } else if (featuresList[i].key == 'lookHouseType') {
            lookHouseTypeArray.push(featuresList[i].value);
          } else if (featuresList[i].key == 'proprietary') {
            proprietaryArray.push(featuresList[i].value);
          } else {
            data[featuresList[i].key] = featuresList[i].value;
          }
        }
      }
      if (featuresArray.length > 0) {//特色
        data.features = featuresArray;
      }
      if (lookHouseTypeArray.length > 0) {//看房方式
        data.lookHouseType = lookHouseTypeArray;
      }
      if (proprietaryArray.length > 0) {//房屋来源
        proprietary = proprietaryArray.join(",");
        data.proprietary = proprietary;
      }
      //获取面积
      var areaListp = [];
      var areaList = that.data.areaList;
      for (var i = 0; i < areaList.length; i++) {
        if (areaList[i].status == 1) {
          var area = areaList[i].value;
          var areaSplit = area.split("-");
          var areaP = {};
          areaP.areaMin = areaSplit[0];
          areaP.areaMax = areaSplit[1];
          areaListp.push(areaP);
        }
      }
      var areaMax = that.data.areaMax;
      var areaMin = that.data.areaMin;
      var area = {};
      if (areaMax != '') {
        area.areaMax = areaMax;
      } else if (areaMin != '') {
        area.areaMax = 10000;
      }
      if (areaMin != '') {
        area.areaMin = areaMin;
      } else if (areaMax != '') {
        area.areaMin = 0;
      }
      if (area.areaMax) {
        areaListp.push(area);
      }
      if (areaListp.length > 0) {
        data.areaList = areaListp;
      }
      //获取户型
      var roomList = [];
      var modelList = that.data.modelList;
      for (var i = 0; i < modelList.length; i++) {
        if (modelList[i].status == 1) {
          var model = modelList[i].value;
          var roomsplit = model.split("-");
          var room = {};
          room.roomMin = roomsplit[0];
          room.roomMax = roomsplit[1];
          roomList.push(room);
        }
      }
      if (roomList.length > 0) {
        data.roomList = roomList;
      }
      //获取价钱
      var salesTotalPriceList = [];
      var priceList = that.data.priceList;
      for (var i = 0; i < priceList.length; i++) {
        if (priceList[i].status == 1) {
          var price = priceList[i].value;
          var priceSplit = price.split("-");
          var priceP = {};
          priceP.salesTotalPriceMin = priceSplit[0];
          priceP.salesTotalPriceMax = priceSplit[1];
          salesTotalPriceList.push(priceP);
        }
      }
      var salesTotalPriceMin = that.data.priceMin;
      var salesTotalPriceMax = that.data.priceMax;
      var price = {};
      if (salesTotalPriceMin != '') {
        price.salesTotalPriceMin = salesTotalPriceMin;
      } else if (salesTotalPriceMax != '') {
        price.salesTotalPriceMin = 0;
      }
      if (salesTotalPriceMax != '') {
        price.salesTotalPriceMax = salesTotalPriceMax;
      } else if (salesTotalPriceMin != '') {
        price.salesTotalPriceMax = 20000;
      }
      if (price.salesTotalPriceMax) {
        salesTotalPriceList.push(price);
      }
      if (salesTotalPriceList.length > 0) {
        data.priceList = salesTotalPriceList;
      }

    } else if (index == 3) {//智能排序
      var intelligenceSortList = that.data.intelligenceSortList;
      var index = that.data.intelligenceSortCheck;
      if (index > -1) {
        data.intelligenceSort = intelligenceSortList[index].value;
      }
    } else if (index == 4) {//更多
      //房源状态
      var statusList = that.data.statusList
      var statusArray = [];
      var status = "";
      for (var i = 0; i < statusList.length; i++) {
        if (statusList[i].status == 1) {
          statusArray.push(statusList[i].value)
        }
      }
      if (statusArray.length > 0) {
        data.status = statusArray;
      }
      //朝向
      var towardList = that.data.towardList
      var towardArray = [];
      var toward = "";
      for (var i = 0; i < towardList.length; i++) {
        if (towardList[i].status == 1) {
          towardArray.push(towardList[i].value)
        }
      }
      if (towardArray.length > 0) {
        data.toward = towardArray;
      }
      //房屋类型
      var houseTypeList = that.data.houseTypeList
      var houseTypeArray = [];
      var houseType = "";
      for (var i = 0; i < houseTypeList.length; i++) {
        if (houseTypeList[i].status == 1) {
          houseTypeArray.push(houseTypeList[i].value)
        }
      }
      if (houseTypeArray.length > 0) {
        data.houseType = houseTypeArray;
      }
    }//产权
    var propertyList = that.data.propertyList
    var propertyArray = [];
    var property = "";
    for (var i = 0; i < propertyList.length; i++) {
      if (propertyList[i].status == 1) {
        propertyArray.push(propertyList[i].value)
      }
    }
    if (propertyArray.length > 0) {
      data.property = propertyArray;
    }//装修
    var decorationList = that.data.decorationList
    var decorationArray = [];
    var decoration = "";
    for (var i = 0; i < decorationList.length; i++) {
      if (decorationList[i].status == 1) {
        decorationArray.push(decorationList[i].value)
      }
    }
    if (decorationArray.length > 0) {
      data.decoration = decorationArray;
    }//房屋用途
    var purposeList = that.data.purposeList
    var purposeArray = [];
    var purpose = "";
    for (var i = 0; i < purposeList.length; i++) {
      if (purposeList[i].status == 1) {
        purposeArray.push(purposeList[i].value)
      }
    }
    if (purposeArray.length > 0) {
      data.purpose = purposeArray;
    }//两税承担
    var taxesFeesList = that.data.taxesFeesList
    var taxesFeesArray = [];
    var taxesFees = "";
    for (var i = 0; i < taxesFeesList.length; i++) {
      if (taxesFeesList[i].status == 1) {
        taxesFeesArray.push(taxesFeesList[i].value)
      }
    }
    if (taxesFeesArray.length > 0) {
      data.taxesFees = taxesFeesArray;
    }//梯户
    var ladderHouseholdList = that.data.ladderHouseholdList;
    var featuresArray = new Array;
    for (var i = 0; i < ladderHouseholdList.length; i++) {
      if (ladderHouseholdList[i].status == 1) {
        featuresArray.push(ladderHouseholdList[i].title)
      }
    }
    //位置
    var locationList = that.data.locationList
    for (var i = 0; i < locationList.length; i++) {
      if (locationList[i].status == 1) {
        featuresArray.push(locationList[i].title)
      }
    }
    //更多买点
    var moreSellingPointList = that.data.moreSellingPointList
    for (var i = 0; i < moreSellingPointList.length; i++) {
      if (moreSellingPointList[i].status == 1) {
        featuresArray.push(moreSellingPointList[i].title)
      }
    }
    if (featuresArray.length > 0) {
      data.features = featuresArray;
    }
    return data;
  },
  //----- 清空选项---------------
  clearFilter: function(e) {
    var index = that.data.searchListTouch;
    this.clearAll();
    this.setData({
      searchListTouch: 0,
      searchShow: !that.data.searchShow,
      regionList: regionList,
      areaCode:''
    })
  },
  // 导航切换清空所有搜索条件
  clearAll: function () {
      //清空商圈
      var regionList = that.data.regionList;
      for (var i = 0; i < regionList.length; i++) {
        regionList[i].isflag = 0;
      }
    //清空特色
    var featuresList = that.data.featuresList;
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i].status = 0;
    }
    //面积
    var areaList = that.data.areaList;
    for (var i = 0; i < areaList.length; i++) {
      areaList[i].status = 0;
    }
    //户型
    var modelList = that.data.modelList;
    for (var i = 0; i < modelList.length; i++) {
      modelList[i].status = 0;
    }
    //总价
    var priceList = that.data.priceList;
    for (var i = 0; i < priceList.length; i++) {
      priceList[i].status = 0;
    }
    //状态
    var statusList = that.data.statusList;
    for (var i = 0; i < statusList.length; i++) {
      statusList[i].status = 0;
    }
    //朝向
    var towardList = that.data.towardList;
    for (var i = 0; i < towardList.length; i++) {
      towardList[i].status = 0;
    }
    //房屋类型
    var houseTypeList = that.data.houseTypeList;
    for (var i = 0; i < houseTypeList.length; i++) {
      houseTypeList[i].status = 0;
    }
    //产权
    var propertyList = that.data.propertyList;
    for (var i = 0; i < propertyList.length; i++) {
      propertyList[i].status = 0;
    }
    //装修
    var decorationList = that.data.decorationList;
    for (var i = 0; i < decorationList.length; i++) {
      decorationList[i].status = 0;
    }
    //房屋用途
    var purposeList = that.data.purposeList;
    for (var i = 0; i < purposeList.length; i++) {
      purposeList[i].status = 0;
    }
    //两税承担
    var taxesFeesList = that.data.taxesFeesList;
    for (var i = 0; i < taxesFeesList.length; i++) {
      taxesFeesList[i].status = 0;
    }
    //梯户
    var ladderHouseholdList = that.data.ladderHouseholdList;
    for (var i = 0; i < ladderHouseholdList.length; i++) {
      ladderHouseholdList[i].status = 0;
    }
    //位置
    var locationList = that.data.locationList;
    for (var i = 0; i < locationList.length; i++) {
      locationList[i].status = 0;
    }
    //更多
    var moreSellingPointList = that.data.moreSellingPointList;
    for (var i = 0; i < moreSellingPointList.length; i++) {
      moreSellingPointList[i].status = 0;
    }
    
      this.setData({
        regionList: regionList,
        featuresList: featuresList,
        areaList: areaList,
        modelList: modelList,
        priceList: priceList,
        statusList: statusList,
        towardList: towardList,
        houseTypeList: houseTypeList,
        propertyList: propertyList,
        decorationList: decorationList,
        purposeList: purposeList,
        ladderHouseholdList: ladderHouseholdList,
        locationList: locationList,
        moreSellingPointList: moreSellingPointList,
        taxesFeesList:taxesFeesList,
        intelligenceSortCheck:-1,//智能排序
        areaCode: '',//区
        priceMin:'',//最小价格
        priceMax:'',//最大价格
        areaMin:'',//面积
        areaMax:''
      })
  },
  onShareAppMessage: function() {
    return require('../../utils/forwardConfig.js').default;
  },
  closeRedEvelope: function() {
    this.setData({
      redEvelopeShow: 'none'
    })
  },
  fxQrCode: function() {
    wx.switchTab({
      url: '/pages/points/points',
    })
    this.closeRedEvelope();
  },
  /**
   * 搜索
   */
  openSearchPage: function(event) {
    var searchData = this.data.searchData;
    wx.navigateTo({
      url: "../search/search?searchData=" + JSON.stringify(searchData),
    });
  }
})