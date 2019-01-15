// 房源详细
// 定义自身引用指针
var that
// 定义全局app实例
var app = getApp()
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
// 定义高德地图
var amapFile = require('../../utils/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
var myAmapFun
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgData: {},
    // 从父界面传入的房源id
    houseId: "",
    refHousekeeperId:"",//业主id
    hkTell:"",//业主电话
    hkName:"",//业主姓名
    // 客服电话
    kefuPhoneNumber: "",
    // 客服电话按钮显示文字
    kefuPhoneTip: "电话",
    // banner的Image
    bannerImageUrlArray: [],
    // banner的PreviewImage
    bannerPreviewImageUrlArray: [],
    // banner中图片列表对应的文字列表
    bannerWaterMarkTextArray: [],
    // banner下面阴影遮罩显示的文字
    waterMarkText: "",
    // banner指示器当前显示的页数
    bannerCurrentItemId: "",
    // 房源描述
    houseDescription: "-",
    // 房源标签
    houseTagArray: [],
    // 上架时间
    shangjiaTime: "-",
    // 佣金
    yongjin: "-",
    // 是否显示成交奖
    isShowChengjiaojiang: true,
    // 成交奖
    chengjiaojiang: "-",
    // 佣金成交奖显示文字
    yongjinchengjiaojiang: "",
    // 是否显示倒计时
    isShowDaojishi: false,
    // 是否显示房主自述
    isSelfDescriptionFlag: false,
    // 房主自述
    selfDescription : "",
    // 预售倒计时显示文字
    daojishiText: "",
    // 预售倒计时天数
    yushouWenziDay: "",
    // 预售倒计时单位
    yushouWenziUnit: "",
    // 预售倒计时内容
    yushouWenziContent: "",
    // 户型
    huxing: "-",
    // 面积
    mianji: "-",
    // 总价
    zongjia: "-",
    // 单价
    danjia: "-",
    // 年代
    niandai: "-",
    // 装修
    zhuangxiu: "-",
    // 产权
    chanquan: "-",
    // 楼层
    louceng: "-",
    // 类型
    leixing: "-",
    // 朝向
    chaoxiang: "-",
    // 用途
    yongtu: "-",
    // 楼盘
    loupan: "-",
    // 地址
    dizhi: "-",
    // 是否显示出售理由
    isShowSellReason: true,
    // 出售理由
    sellReason: "-",
    // 是否显示房屋状况
    isShowHouseZhuangkuang: true,
    // 房屋状况
    houseZhuangkuang: "-",
    // 是否显示特别优势
    isShowspecialYoushi: true,
    // 特别优势
    specialYoushi: "-",
    // 是否显示装修介绍
    isShowZhuangxiuJieshao: true,
    // 装修介绍
    zhuangxiuJieshao: "-",
    // 是否显示学区详情
    isShowXuequDetail: true,
    // 学区详情
    xuequDetail: "-",
    // 是否显示房屋卖点
    isShowHouseMaidian: true,
    // 房屋卖点
    houseMaidian: "-",
    // 是否显示两税
    isShowLiangshui: true,
    // 两税
    liangshui: "-",
    // 是否显示户口
    isShowHukou: true,
    // 户口
    hukou: "-",
    // 税费承担
    shuifeichengdan: "-",
    // 是否显示最佳带看时间
    isShowBestDaikanTime: true,
    // 最佳带看时间
    bestDaikanTime: "-",
    // 是否显示欠缴
    isShowQianjiao: true,
    // 是否欠缴
    qianjiao: "-",
    // 是否显示倒房时间
    isShowDaofangTime: true,
    // 倒房时间
    daofangTime: "-",
    // 是否显示其他说明
    isShowOtherShuoming: true,
    // 其他说明
    otherShuoming: "-",
    // 地图经度
    longitude: 113.324520,
    // 地图纬度
    latitude: 23.21229,
    // 地图标记点
    mapMarkers: [],
    // 是否显示地图下的galary
    isShowLoacationImage: false,
    // 地图下的galary
    galaryImageUrlArray: [],
    // 地图下的galary预览图
    galaryPreviewImageUrlArray: [],
    // 是否显示注意事项
    isShowWarningContent: true,
    // 注意事项
    warningContent: "-",
    // 是否显示带看流程
    isShowDaikanLiucheng: false,
    // 带看流程
    daikanLiuchengArray: [],
    // 关注按钮
    shoucangClass: "mmf-shoucang",
    shoucang: "已关注",
    // 申请开锁态标志, 1锁显示2锁维修中3不显示
    suoStatus: "",
    weixiuClass:'',
    // 申请开锁按钮显示文字
    suoTip: "",
    // 高德地图图片截图地址
    gaodeMapImageUrl: "",
    // 自营状态标志, 1是2否
    ziyingStatus: "",
    // 按钮栏显示的按钮个数
    showingButtonCount: "",
    // 锁编号
    lockCode:"",
    // 锁类型
    lockType:"",
    lookHouseType:"",
    houseBtnShow: true,
    newSuoTip:'',//开锁按钮锁文字 申请开锁，锁维修中，预约看房
    newSuoTip2:'',
    showShouYe:true,
    showAddressFlag:false,//是否显示地址
    dialogueFlag:true,//聊天或电话
    linkPhone:"",
    linkHuanAccount:"",
    linkHeadImg : "",
    keyAddress: '',
    showIMFlag: true,// 显示IM  
    dialingFlag: false ,//拨号触发 
    friendHeadImg : "",
    friendName:"",
    myPhoneShow:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    var showShouYe = options.showShouYe;
    var showShouYe1 = that.data.showShouYe;
    if (showShouYe && showShouYe == "1"){
      showShouYe1 = false;
    }
    // 从父界面获取数据
    that.setData({
      houseId: options.id,
      showShouYe: showShouYe1
    })
    // 构造高德地图
    myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeMapAPIKey
    });
    // 请求详细数据
    that.showLoading()
    that.requestDetaildata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var tmp = this.data.daikanLiuchengArray
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  /**
   * 请求详细信息
   */
  requestDetaildata: function() {
    // 请求详细信息
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/getXCXHouseSource",
      header: {
        "Content-Type": "application/json"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        houseSourceId: that.data.houseId,
        agentId: app.globalData.agentInfo.id
      },
      complete: function(res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          that.showToast('网络请求失败')
        } else {
          that.setData({
            imgData: res.data
          })
          // 请求成功
          that.updateDataByResult(res.data)
        }
        that.dissmissLoading()
      }
    })
  },

  /**
   * Banner点击处理
   */
  onBannerClick: function() {
    var previewUrl = that.data.bannerPreviewImageUrlArray
    if (undefined != previewUrl && null != previewUrl && previewUrl.length > 0) {
      var currentImageIndex = 0
      if (parseInt(that.data.bannerCurrentItemId) > 0) {
        currentImageIndex = that.data.bannerCurrentItemId - 1
      } else {
        currentImageIndex = 0
      }
      wx.previewImage({
        // 当前显示图片的http链接
        current: previewUrl[currentImageIndex],
        // 需要预览的图片http链接列表
        urls: previewUrl
      })
    }
  },

  /**
   * Banner切换监听
   */
  onBannerChange: function(event) {
    var currentIndex = parseInt(event.detail.current)
    // 指示器
    var newBannerCurrentItemId = "0"
    if (that.data.bannerImageUrlArray.length > 0) {
      newBannerCurrentItemId = "" + (currentIndex + 1)
    } else {
      newBannerCurrentItemId = "0"
    }
    var currentWaterMarkText = stringAssistant.nonNull(that.data.bannerWaterMarkTextArray[currentIndex])
    that.setData({
      // banner下面阴影遮罩显示的文字
      waterMarkText: currentWaterMarkText,
      // banner指示器当前显示的页数
      bannerCurrentItemId: newBannerCurrentItemId,
    })
  },
  /**
   * 地图点击处理
   */
  onLocationClick: function() {
    // var param = { "latitude": that.data.latitude, "longitude": that.data.longitude, "name": "测试", "address": "地址" }
    // wx.openLocation(param)
    wx.navigateTo({
      url: "../houseDetail/location/LocationInfo?latitude=" + that.data.latitude + "&longitude=" + that.data.longitude,
    })
  },
  /**
   * 地图点击处理
   */
  onLocationClick: function() {
    // var param = { "latitude": that.data.latitude, "longitude": that.data.longitude, "name": "测试", "address": "地址" }
    // wx.openLocation(param)
    // wx.navigateTo({
    //   url: "../houseDetail/location/LocationInfo?latitude=" + that.data.latitude + "&longitude=" + that.data.longitude,
    // })
    var address = that.data.dizhi;
    if (that.data.showAddressFlag){
      address = "(请联系经纪人获取详细地址)";
    }
    wx.openLocation({
      latitude: parseFloat(that.data.latitude),
      longitude: parseFloat(that.data.longitude),
      scale: 15,
      name: that.data.houseDescription,
      address: address,
    })
  },
  /**
   * 地图下galary点击处理
   */
  onLocationImageItemClick: function(event) {
    var previewUrl = that.data.galaryPreviewImageUrlArray
    if (undefined != previewUrl && null != previewUrl && previewUrl.length > 0) {
      var index = event.currentTarget.dataset.index
      wx.previewImage({
        // 当前显示图片的http链接
        current: that.data.galaryImageUrlArray[index],
        // 需要预览的图片http链接列表
        urls: that.data.galaryImageUrlArray
      })
    }
  },
  /**
   * 关注点击处理
   */
  onShoucangClick: function() {
    // 请求关注
    that.showLoading()
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouseCollect/save",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        openId: app.globalData.openId,
        houseSourceId: that.data.houseId,
        agentId: app.globalData.agentInfo.id
      },
      complete: function(res) {
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          that.showToast('网络请求失败')
        } else {
          // 请求成功, 重新请求详细信息
          if(that.data.shoucang == '已关注'){
            that.setData({
              shoucangClass: "mmf-shoucang",
              shoucang: "关注",
            })
          }else{
            that.setData({
              shoucangClass: "mmf-yishoucang",
              shoucang: "已关注",
            })
          }
        }
        wx.hideLoading();
      }
    })
  },
  /**
   * 客服点击处理
   */
  onKefuClick: function() {
    wx.makePhoneCall({
      phoneNumber: that.data.kefuPhoneNumber
    })
  },
  /**
   * 申请开锁点击处理
   * 旧的地址，url: "../password/passwordRequest/LockRequest?lockCode=" + that.data.lockCode+"&houseId=" + that.data.houseId,
   * 
   * 
   * 
   */
  onKaisuoshenqingClick: function() {
    if (that.data.suoStatus == "1") {
      if (that.data.lockType == 1) {
        wx.navigateTo({
          url: "../password/bluetooth/bluetooth?lockCode=" + that.data.lockCode + "&houseId=" + that.data.houseId,
        })
      } else if (that.data.lockType == 2) {
        wx.navigateTo({
          url: "../password/passwordRequest/LockRequest?houseId=" + that.data.houseId,
        })
      } else if (that.data.lockType == 3) {
        wx.navigateTo({
          url: "../password/bluekey/bluekey?lockCode=" + that.data.lockCode + "&houseId=" + that.data.houseId,
        })
      }
    }
    
    
  },
  /**
   * 房源预约
   */
  onTakeLookClick: function () {
        wx.navigateTo({
          url: "../houseDetail/yuyue/yuyue?houseId=" + that.data.houseId
        })
  },
  /**
   * 显示Toast
   */
  showToast: function(message) {
    var msg = ""
    if (message.length > 0) {
      msg = message
    }
    wx.showToast({
      title: msg,
      icon: "none"
    })
  },
  /**
   * 显示加载中
   */
  showLoading: function() {
    wx.showLoading({
      title: "数据加载中..",
      mask: true
    })
  },
  /**
   * 隐藏加载中
   */
  dissmissLoading: function() {
    wx.hideLoading()
  },
  /**
   * 根据请求来的结果更新显示数据
   */
  updateDataByResult: function(resultData) {
    var data = resultData.data;
    if ((undefined != data) && (null != data)) {
      // 构造bannder的图片列表, 构造banner的水印文字列表和当前显示的水印文字, 构造Banner指示器
      // 图片列表和水印文字列表
      var newImageUrl = []
      var newWaterMarkTextArray = []
      var newPreviewImageUrl = []
      if ((undefined != data.houseImgUrlList) && (null != data.houseImgUrlList)) {
        // 构造banner上轮播的图片
        for (var index in data.houseImgUrlList) {
          var houzhui = data.houseImgUrlList[index].watermark
          if ((undefined == houzhui) && (null == houzhui)) {
            houzhui = ""
          }
          var gaoqingHouzhui = data.houseImgUrlList[index].standard
          if ((undefined == gaoqingHouzhui) && (null == gaoqingHouzhui)) {
            gaoqingHouzhui = ""
          }
          var finalUrl = data.houseImgUrlList[index].xcximgUrl + houzhui
          var finalUrlGaoqing = data.houseImgUrlList[index].xcximgUrl + gaoqingHouzhui;
          newImageUrl.push(finalUrl)
          newPreviewImageUrl.push(finalUrlGaoqing)

          var waterMarkText = stringAssistant.nonNull(data.houseImgUrlList[index].imgTitle)
          newWaterMarkTextArray.push(waterMarkText)
        }

        // 指示器
        var newBannerCurrentItemId = "0"
        if (data.houseImgUrlList.length > 0) {
          newBannerCurrentItemId = "1"
        } else {
          newBannerCurrentItemId = "0"
        }
      }
      // 下方水印文字
      var newCurrentWaterMarkText = ""
      if (undefined != newWaterMarkTextArray && null != newWaterMarkTextArray && newWaterMarkTextArray.length > 0) {
        newCurrentWaterMarkText = newWaterMarkTextArray[0]
      }

      // 判断是否显示成交奖
      var newShowChengjiaojiang = false
      if (stringAssistant.isEmpty(data.redEnvelope)) {
        newShowChengjiaojiang = false
      } else {
        if (data.redEnvelope == "0") {
          newShowChengjiaojiang = false
        } else {
          newShowChengjiaojiang = true
        }
      }

      // 佣金成交奖显示文字
      var newYongjinchengjiaojiang = ""
      var yongjin = ""
      var chengjiaojiangli = ""
      if (stringAssistant.isEmpty(data.hireMoney)) {
        yongjin = ""
      } else {
        yongjin = "佣金" + data.hireMoney + "%"
      }
      if (stringAssistant.isEmpty(data.redEnvelope) || data.redEnvelope == "0") {
        chengjiaojiangli = ""
      } else {
        if (!stringAssistant.isEmpty(yongjin)) {
          chengjiaojiangli = ", "
        }
        chengjiaojiangli = chengjiaojiangli + "成交奖励" + data.redEnvelope
      }
      newYongjinchengjiaojiang = yongjin + chengjiaojiangli

      // 判断是否显示预售时间
      var newIsShowDaojishi = false
      var newDaojishiText = ""
      var statusGet = stringAssistant.nonNull(data.status)
      if (statusGet == "2") {
        newIsShowDaojishi = true
        newDaojishiText = stringAssistant.nonNull(data.remainingTimeStr)
      } else {
        newIsShowDaojishi = false
        newDaojishiText = ""
      }
      // 设置预售开盘时间显示文字
      var newYushouWenziDay = ""
      var newYushouWenziUnit = ""
      var newYushouWenziContent = ""
      var remainingTimeGet = stringAssistant.nonNull(data.remainingTime)
      if (remainingTimeGet <= 0) {
        newYushouWenziDay = ""
        newYushouWenziUnit = ""
        newYushouWenziContent = stringAssistant.nonNull(data.remainingContent)
      } else {
        newYushouWenziDay = stringAssistant.nonNull(data.remainingTime)
        newYushouWenziUnit = stringAssistant.nonNull(data.remainingTimeStr)
        newYushouWenziContent = stringAssistant.nonNull(data.remainingContent)
      }

      // 拼接楼层信息
      var newLouceng = data.floor + "/" + data.floorTotal

      // 判断是否关注
      var collect = data.collect
      var shoucangClass = ""
      var shoucangText = ""
      if (collect > 0) {
        shoucangClass = 'mmf-yishoucang';
        shoucangText = "已关注"
      } else {
        shoucangClass = "mmf-shoucang"
        shoucangText = "关注"
      }
      // 构造地图标记点
      var latitude = data.lat;
      var longitude = data.lng;
      var newMapMarkers = [{
        id: 0,
        latitude: data.lat,
        longitude: data.lng,
        title: data.estate,
        iconPath: "../../resources/image/iconLocation.png",
        width: "23",
        height: "23"
      }]
      // var newMapMarkers = [{ id: 0, latitude: 23.099994, longitude: 113.324520, title: data.estate, iconPath: "../../resources/image/iconLocation.png", width: "23", height: "23" }]

      // 请求高德地图api
      var width = 445;
      var height = 207;

      var size = width + "*" + height;
      myAmapFun.getStaticmap({
        zoom: 15,
        size: size,
        scale: 2,
        location: longitude + "," + latitude,
        markers: "large,0xF87100,房:" + longitude + "," + latitude,
        success: function(data) {
          that.setData({
            gaodeMapImageUrl: data.url
          })
        },
        fail: function (info) {
          wx.showModal({
            title: info.errMsg
          })
        }
      })

      // 构造Galary的图片列表
      var newGalaryImageUrlArray = []
      var newGalaryPreviewImageUrlArray = []
      var tempShowGalary = (undefined != data.locationImgurlList && null != data.locationImgurlList && data.locationImgurlList.length > 0)
      if (tempShowGalary) {
        for (var index in data.locationImgurlList) {
          var houzhui = data.locationImgurlList[index].watermark
          var gaoqingHouzhui = data.locationImgurlList[index].standard
          if ((undefined == houzhui) && (null == houzhui)) {
            houzhui = ""
          }
          if ((undefined == gaoqingHouzhui) && (null == gaoqingHouzhui)) {
            gaoqingHouzhui = ""
          }
          var finalUrl = data.locationImgurlList[index].xcximgUrl + houzhui
          var finalUrlGaoqing = data.locationImgurlList[index].xcximgUrl + gaoqingHouzhui
          newGalaryImageUrlArray.push(finalUrl)
          newGalaryPreviewImageUrlArray.push(finalUrlGaoqing)
        }
      }
      // 房源标签
      if ((data.features != undefined) && (data.features != null)) {
        that.setData({
          
        })
      }

      // 设置带看流程
      var tempShowDaikanliucheng = false
      // 构造带看流程
      var newDaikanliuchengArray = []
      for (var index in data.operationProcessList) {
        var item = {}
        item.isShowItem = !stringAssistant.isEmpty(data.operationProcessList[index].operationProcess)
        item.data = data.operationProcessList[index].operationProcess
        newDaikanliuchengArray.push(item)
      }
      // 判断是否显示带看流程
      for (var index in newDaikanliuchengArray) {
        var item = newDaikanliuchengArray[index]
        if (true == item.isShowItem) {
          tempShowDaikanliucheng = true
          break
        }
      }

      // 自营状态
      var newZiyingStatus = ""
      if (stringAssistant.nonNull(data.optimization)) {
        newZiyingStatus = "" + data.optimization
      }
      
      // 地址是否显示
      var showAddressFlag = false;
      var adressStr = stringAssistant.nonNull(data.address);
      // 当地址为大连,开锁方式为非智能锁时,隐藏地址
      if (data.proprietary == 4 && data.cityCode == "210200" && data.lookHouseType != "2"){
        showAddressFlag = true;
        adressStr = "(请联系经纪人获取详细地址)";
      }
      // 处理IM聊天的逻辑
      // 当房源为独家房源时,地址也设置为隐藏
      // 当房源类型为独家时，显示经纪人(直接拨打电话功能)
      var showIMFlag = that.data.showIMFlag;
      if(data.proprietary == 4){
        showAddressFlag = true;
        adressStr = "(请联系经纪人获取详细地址)";
        showIMFlag = false;
      }
      // 当地址为大连聊天，当地址非大连直接联系客户
      var dialogueFlag = that.data.dialogueFlag;
      if (data.cityCode != "210200"){
        dialogueFlag = false;
      }
      // 当房主自述不为空时
      var selfDescription = data.selfDescription;
      var isSelfDescriptionFlag = that.data.isSelfDescriptionFlag;
      if (selfDescription){
        isSelfDescriptionFlag = true;
      }
      that.setData({
        // 客服电话
        kefuPhoneNumber: data.phone,
        refHousekeeperId:data.refHousekeeperId,
        hkTell: data.hkTell,
        hkName: data.hkName,
        // banner的Image
        bannerImageUrlArray: newImageUrl,
        // banner的PreviewImage
        bannerPreviewImageUrlArray: newPreviewImageUrl,
        // banner中图片列表对应的文字列表
        bannerWaterMarkTextArray: newWaterMarkTextArray,
        // banner下面阴影遮罩显示的文字
        waterMarkText: newCurrentWaterMarkText,
        // banner指示器当前显示的页数
        bannerCurrentItemId: newBannerCurrentItemId,
        // 房源描述
        houseDescription: data.houseTitle,
        // 上架时间
        shangjiaTime: data.updateDateStr,
        // 佣金
        yongjin: data.hireMoney,
        // 是否显示成交奖
        isShowChengjiaojiang: newShowChengjiaojiang,
        // 成交奖
        chengjiaojiang: data.redEnvelope,
        // 佣金成交奖显示文字
        yongjinchengjiaojiang: newYongjinchengjiaojiang,
        // 是否显示倒计时
        isShowDaojishi: newIsShowDaojishi,
        // 预售倒计时显示文字
        daojishiText: newDaojishiText,
        // 预售倒计时天数
        yushouWenziDay: newYushouWenziDay,
        // 预售倒计时单位
        yushouWenziUnit: newYushouWenziUnit,
        // 预售倒计时内容
        yushouWenziContent: newYushouWenziContent,
        // 户型
        huxing: data.doorModel,
        // 面积
        mianji: data.area,
        // 总价
        zongjia: data.salesTotalPrice,
        // 单价
        danjia: data.salesPrice,
        // 年代
        niandai: data.buildingYear,
        // 装修
        zhuangxiu: data.decoradionStr,
        // 产权
        chanquan: data.propertyRightsStr,
        // 楼层
        louceng: newLouceng,
        // 类型
        leixing: data.typeStr,
        // 朝向
        chaoxiang: data.orientationStr,
        // 用途
        yongtu: data.purposeStr,
        // 楼盘
        loupan: data.estate,
        // 是否显示两税
        isShowLiangshui: !stringAssistant.isEmpty(data.isTaxStr),
        // 两税
        liangshui: data.isTaxStr,
        // 是否显示户口
        isShowHukou: !stringAssistant.isEmpty(data.permanentResidenceStr),
        // 户口
        hukou: data.permanentResidenceStr,
        // 税费承担
        shuifeichengdan: data.taxesFeesStr,
        // 是否显示最佳带看时间
        isShowBestDaikanTime: !stringAssistant.isEmpty(data.bestLookTime),
        // 最佳带看时间
        bestDaikanTime: data.bestLookTime,
        // 是否显示欠缴
        isShowQianjiao: !stringAssistant.isEmpty(data.isArrearsStr),
        // 是否欠缴
        qianjiao: data.isArrearsStr,
        // 是否显示倒房时间
        isShowDaofangTime: !stringAssistant.isEmpty(data.giveHouseTime),
        // 倒房时间
        daofangTime: data.giveHouseTime,
        // 是否显示其他说明
        isShowOtherShuoming: !stringAssistant.isEmpty(data.specialInstructions),
        // 其他说明
        otherShuoming: data.specialInstructions,
        // 地图经度
        longitude: data.lng,
        // 地图纬度
        latitude: data.lat,
        // 地图标记点
        mapMarkers: newMapMarkers,
        // 是否显示地图中的galary
        isShowLoacationImage: tempShowGalary,
        // 地图下的galary
        galaryImageUrlArray: newGalaryImageUrlArray,
        // 地图下的galary预览图
        galaryPreviewImageUrlArray: newGalaryPreviewImageUrlArray,
        // 关注按钮
        shoucangClass: shoucangClass,
        shoucang: shoucangText,
        // 地址
        dizhi: adressStr,
        // 锁编号
        lockCode:data.lockCode,
        // 锁类型
        lockType:data.lockType,

        // 是否显示出售理由
        isShowSellReason: !stringAssistant.isEmpty(data.saleReason),
        // 出售理由
        sellReason: data.saleReason,
        // 是否显示房屋状况
        isShowHouseZhuangkuang: !stringAssistant.isEmpty(data.houseCondition),
        // 房屋状况
        houseZhuangkuang: data.houseCondition == undefined ? '-' : data.houseCondition,
        // 是否显示特别优势
        isShowspecialYoushi: !stringAssistant.isEmpty(data.specialAdvantage),
        // 特别优势
        specialYoushi: data.specialAdvantage == undefined  ? '-' : data.specialAdvantage ,
        // 是否显示装修介绍
        isShowZhuangxiuJieshao: !stringAssistant.isEmpty(data.decorateIntroduce),
        // 装修介绍
        zhuangxiuJieshao: data.decorateIntroduce,
        // 是否显示学区详情
        isShowXuequDetail: !stringAssistant.isEmpty(data.schoolDistrictDetails),
        // 学区详情
        xuequDetail: data.schoolDistrictDetails,
        // 是否显示房屋卖点
        isShowHouseMaidian: !stringAssistant.isEmpty(data.sellingPoint),
        // 房屋卖点
        houseMaidian: data.sellingPoint,
        //房源标签
        houseTagArray: (data.features != undefined) && (data.features != null) ? (data.features != undefined) && (data.features != null) : [],
        // 是否显示带看流程
        isShowDaikanLiucheng: tempShowDaikanliucheng,
        // 带看流程
        daikanLiuchengArray: newDaikanliuchengArray,
        // 设置自营状态
        ziyingStatus: newZiyingStatus,
        //看房类型
        lookHouseType: data.lookHouseType,
        //预约按钮是否可点
        takeLookBtnColor: 0,
        // 地址隐藏标识
        showAddressFlag : showAddressFlag ,
        // 聊天或电话flag
        dialogueFlag: dialogueFlag,
        // 房主电话
        linkPhone: data.linkPhone,
        // 房主环信账号
        linkHuanAccount: data.linkHuanAccount,
        // 房主头像
        linkHeadImg: data.wxImg,
        // 房主自述显示标识
        isSelfDescriptionFlag: isSelfDescriptionFlag,
        // 房主自述信息
        selfDescription: selfDescription,
        //  钥匙地址
        keyAddress: data.keyPlace,
        // 是否显示IM聊天标识
        showIMFlag: showIMFlag
      })
      // 客服按钮文字
     // var newKefuPhoneTip = ""
     // if (that.data.ziyingStatus == "1") {
     //   newKefuPhoneTip = "客服"
     // } else {
     //   newKefuPhoneTip = "电话"
     //}
     // that.setData({
     //    kefuPhoneTip: newKefuPhoneTip
     // })
    
      var isShowShowcangShenqingkaisuo = stringAssistant.nonNull(data.upDown) == "1" && stringAssistant.nonNull(data.status) == "1"

      var takeLookBtnColor = 0;
      // 判断是否显示关注和申请开锁
      if (data.lookHouseType!= 3 && isShowShowcangShenqingkaisuo) {
        // 锁按钮文字
        var newSuoTip = "";
        var newSuoTip2 = "";
        var houseBtnShow = true;
        var suoStatus = '2';
        var weixiuClass= '';
        if (that.data.lookHouseType == "1" || that.data.lookHouseType == "3" || that.data.lookHouseType == "4") {
          newSuoTip2 = "即将开启";
          newSuoTip = "预约看房";
          // 设置预约状态
          houseBtnShow = false;
          weixiuClass = 'qidaiBlack';
          // if (data.takeLookBtnColor == 0){
          //   weixiuClass = 'qidai';
          // }else {
          //   takeLookBtnColor = 1;
          //   newSuoTip2 = "";
          // }
          // 当看房类型是4钥匙在中介时
          if (that.data.lookHouseType == "4"){
            // 当类型是钥匙在中介时
            newSuoTip2 = "获取钥匙";
            newSuoTip = "";
            weixiuClass = 'mmf';
          }
        } else if ( statusGet == '2' ){
            houseBtnShow = true;
        }else {
          if (data.xcxLockStatus == "1") {
            // 按钮栏显示3个按钮
            newSuoTip = "申请开锁"
            houseBtnShow = false;
            suoStatus = '1';
          } else if (data.xcxLockStatus == "2") {
            // 按钮栏显示3个按钮
            newSuoTip = "锁维修中"
            houseBtnShow = false;
            suoStatus = '2';
            weixiuClass = 'weixiu';
          } else if (data.xcxLockStatus == "3"){
            newSuoTip = "智能锁"
            houseBtnShow = false;
            suoStatus = '2';
            weixiuClass = 'weixiu';
          } 
        }
        that.setData({
          houseBtnShow: houseBtnShow,
          newSuoTip: newSuoTip,
          newSuoTip2: newSuoTip2,
          suoStatus: suoStatus,
          weixiuClass: weixiuClass,
          takeLookBtnColor: takeLookBtnColor
        });
      } 

      // 判断是否显示注意事项
      var newWarningContent = stringAssistant.nonNull(data.mattersNeedingAttention)
      var showWarningContent = true
      if (stringAssistant.isEmpty(newWarningContent)) {
        showWarningContent = false
      } else {
        showWarningContent = true
      }
      that.setData({
        // 是否显示注意事项
        isShowWarningContent: showWarningContent,
        // 注意事项
        warningContent: newWarningContent
      });
    }
  },
  messagefuClick:function(){
    that = this;
    var wxImg ="";
    if (that.data.imgData.data.wxImg){
      wxImg = that.data.imgData.data.wxImg;
    }
    var agentInfo = app.globalData.agentInfo;
    if (that.data.dialogueFlag){
      // 房主名称
      var hkName = that.data.hkName ? that.data.hkName : "";
      // 标题
      var houseDescription = that.data.houseDescription ? that.data.houseDescription : "";
      // 户型
      var huxing = that.data.huxing ? that.data.huxing : "";
      // 面积
      var mianji = that.data.mianji ? that.data.mianji + "平": "";
      // 金额
      var moneySum = that.data.zongjia ? that.data.zongjia + "万": "";
      // 点击房主跳转小程序
      var url = 'friendAccount='+ that.data.linkHuanAccount + "&myHeadImg=" + agentInfo.wxImg + "&myId=" + agentInfo.id + "&friendId=" + that.data.refHousekeeperId + "&friendName=" + hkName + "&myName=" + agentInfo.agentName + "&friendHeadImg=" + that.data.linkHeadImg + "&houseDescription=" + houseDescription + "&huxing=" + huxing + "&mianji=" + mianji + "&moneySum=" + moneySum + "&friendType=2";
      console.log(app.globalData.agentInfo);
      wx.navigateToMiniProgram({
        appId: 'wx8f3556af2f98a160',
        path: 'pages/welcome/welcome',
        extraData: {
          source: "1",
          userInfo: app.globalData.agentInfo,
          huanAccount: wx.getStorageSync("myUsername"),
          paramUrl: url
        },
        envVersion: app.globalData.environmental,
        success(res) {
          // 打开成功
        }
      });
      // if(){
        
      // }

      // wx.navigateTo({
      //   url: '/pages/messageDetail/messageDetail?
      // });
    }else{
      wx.makePhoneCall({
        phoneNumber: that.data.linkPhone
      });
    }
  },
  createForwardImg: function() {
    const that = this;
    wx.showLoading({
      title: "生成转发图",
      mask: true
    });
    let wuimg = '/resources/image/canvas/wuimg.png';
    var tempUrls = [];
    let houseImgUrlList = that.data.imgData.data.houseImgUrlList;
    let context = app.globalData.baseUrl.substring(app.globalData.baseUrl.lastIndexOf("/"), app.globalData.baseUrl.length);
    let youtu = 0;
    for (let i = 0; i < 5; i++) {
      if (houseImgUrlList[i + 1] != undefined || (!houseImgUrlList[i + 1] && houseImgUrlList[i] && houseImgUrlList[i].type != 2)) {
        if (houseImgUrlList[i]) {
          youtu++;
        }
        tempUrls.push(!houseImgUrlList[i] ? wuimg : houseImgUrlList[i].xcximgUrl.replace("http://snailhome.oss-cn-huhehaote.aliyuncs.com", app.globalData.baseUrl.replace(context, "") + "/oss") + houseImgUrlList[i].original);
      } else {
        tempUrls.push(wuimg);
      }
    }
    if (houseImgUrlList.length > 0 && houseImgUrlList[houseImgUrlList.length - 1].type == 2) {
      tempUrls.push(houseImgUrlList[houseImgUrlList.length - 1].xcximgUrl.replace("http://snailhome.oss-cn-huhehaote.aliyuncs.com", app.globalData.baseUrl.replace(context, "") + "/oss") + houseImgUrlList[houseImgUrlList.length - 1].original);
    } else {
      if (houseImgUrlList.length >= 6) {
        tempUrls.push(houseImgUrlList[5].xcximgUrl.replace("http://snailhome.oss-cn-huhehaote.aliyuncs.com", app.globalData.baseUrl.replace(context, "") + "/oss") + houseImgUrlList[5].original);
      } else {
        tempUrls.push(wuimg)
      }
    }
    let qrUrl = app.globalData.baseUrl + "/xcx/xcxHouse/houseSourceInfoH5?tell=" + app.globalData.agentInfo.tell + "%26houseSourceId=" + this.data.houseId;
    tempUrls.push(app.globalData.baseUrl + '/xcx/xcxGenerateQrCode/getQRCode?openId=' + app.globalData.openId + '&qrUrl=' + encodeURI(qrUrl));
    let getFilePS = tempUrls.map((path) => {
      return new Promise((resolve, reject) => {
        if (path != wuimg) {
          wx.downloadFile({
            url: path, //仅为示例，并非真实的资源
            success: function(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                resolve(res.tempFilePath)
              }
            },
            fail: function(err) {
              reject(err)
            }
          })
        } else {
          setTimeout(function() {
            resolve(path)
          }, 200);
        }

      });
    })

    Promise.all(getFilePS).then(function(posts) {
      that.draw(posts);
    }).catch(function(reason) {
      wx.showToast({
        title: '生成失败',
        icon: 'none',
        duration: 1000
      })
    });
  },
  draw: function(tempFilePaths) {
    const width = 750,
      height = 1334;
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.save();
    //上部白色背景
    ctx.drawImage("/resources/image/canvas/bai.png", 0, 0, width, 923);
    //下部橙色背景
    ctx.drawImage("/resources/image/canvas/hong.png", 0, 923, width, height);
    //六张楼盘分享图
    ctx.drawImage(tempFilePaths[0], 32, 32, 334, 250);
    ctx.drawImage(tempFilePaths[1], 384, 32, 334, 250);
    ctx.drawImage(tempFilePaths[2], 32, 300, 334, 250);
    ctx.drawImage(tempFilePaths[3], 384, 300, 334, 250);
    ctx.drawImage(tempFilePaths[4], 32, 568, 334, 250);
    ctx.drawImage(tempFilePaths[5], 384, 568, 334, 250);
    //中部白色背景
    ctx.drawImage("/resources/image/canvas/Rectangle 24.png", 21, 808, 707, 395);
    //标题
    ctx.setFontSize(32)
    ctx.setFillStyle("#333333")
    let top = 875;
    let title = that.data.houseDescription;
    let zishu = 12,
      hang = title.length / zishu;
    let i = -1;
    let dangqian = "";
    while (i != title.length) {
      i++;
      dangqian += title.charAt(i);
      if (dangqian.replace(" ", "").length == zishu) {
        ctx.setFontSize(32)
        ctx.setFillStyle("#333333")
        ctx.fillText(dangqian, 72, top)
        top += 38;
        dangqian = "";
      }
      if (i == title.length && dangqian != "") {
        ctx.setFontSize(32)
        ctx.setFillStyle("#333333")
        ctx.fillText(dangqian, 72, top)
        top += 38;
      }

    }
    //二维码
    ctx.drawImage(tempFilePaths[6], 556, 850, 132, 130);

    //价格等文字
    let top1 = top + 30,
      top2 = top + 68;
    ctx.setFontSize(28)
    ctx.setFillStyle("#999999")
    ctx.fillText("价格", 62, top1)
    ctx.setFontSize(28)
    ctx.setFillStyle("#999999")
    ctx.fillText("户型", 220, top1)
    ctx.setFontSize(28)
    ctx.setFillStyle("#999999")
    ctx.fillText("面积", 411, top1)
    //价格下面的值
    ctx.setFontSize(28)
    ctx.setFillStyle("#F87100")
    ctx.fillText(that.data.zongjia + '万', 61, top2)
    ctx.setFontSize(28)
    ctx.setFillStyle("#F87100")
    ctx.fillText(that.data.huxing.length > 6 ? that.data.huxing.substring(0, 6) : that.data.huxing, 220, top2)
    ctx.setFontSize(28)
    ctx.setFillStyle("#F87100")
    ctx.fillText(that.data.mianji + '㎡', 411, top2)

    //经纪人信息分割线
    ctx.drawImage("/resources/image/canvas/hui.png", 62, 1095, 626, 1);

    //经纪人信息
    ctx.setFontSize(28)
    ctx.setFillStyle("#666666")
    ctx.fillText(`联系人: ${app.globalData.agentInfo.agentName} ${app.globalData.agentInfo.tell}`, 200, 1148)

    //底部转发文字
    ctx.setFontSize(30)
    ctx.setFillStyle("#FFFFFF")
    ctx.fillText('欢迎长按识别该房源二维码', 200, 1263)

    //好房分享
    ctx.drawImage("/resources/image/canvas/haofangfenxiang.png", 61, 0, 210, 72);
    ctx.draw(false, function() {
      ctx.restore();
      wx.canvasToTempFilePath({
        width: width,
        height: height,
        canvasId: 'myCanvas',
        success: function(res) {
          wx.previewImage({
            urls: [res.tempFilePath]
          })
          wx.hideLoading();
          return;
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(r) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function() {
                  wx.showToast({
                    title: '生成成功',
                    icon: 'success',
                    duration: 1000
                  })
                  // wx.hideLoading();
                }
              })
            },
            fail(r) {
              wx.showToast({
                title: '权限异常',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
    });
  },
  onShareAppMessage: function() {
    return {
      title: that.data.imgData.data.houseTitle,
      path: '/pages/welcome/welcome?houseSourceId=' + this.data.houseId,
      imageUrl: that.data.imgData.data.houseImgUrlList[0].xcximgUrl + that.data.imgData.data.houseImgUrlList[0].watermark
    }
  },
  checkHouseBtn:function (){
    
    if (that.data.lookHouseType == '1' && that.data.takeLookBtnColor > 0){
      wx.navigateTo({
        url: "../houseDetail/yuyue/yuyue?houseId=" + that.data.houseId
      })
    } else if (that.data.suoStatus == '1'){
      this.onKaisuoshenqingClick();
    }
    //  当看房类型为钥匙在中介时
    if(that.data.lookHouseType == '4'){
      wx.navigateTo({
        url: "../houseDetail/keyAddress/keyAddress?keyAddress=" + that.data.keyAddress
      })
    }
  },
  goShouye:function (){
    wx.switchTab({
      url: '/pages/housing/housing'
    })
  },
  /**
   * 显示拨号弹出层
   */
  dialPhone:function(){
    var that = this;
    // 房主名称
    var hkName = that.data.hkName;
    var friendHeadImg = that.data.linkHeadImg;
    // 手机号加密
    var linkPhone = app.globalData.agentInfo.tell;
    var myPhoneShow = String(linkPhone);
    if (myPhoneShow){
      myPhoneShow = myPhoneShow.substr(0, 3) + "****" + myPhoneShow.substr(7); 
    }
    this.setData({
      dialingFlag: true,
      friendHeadImg: friendHeadImg,
      myPhoneShow: myPhoneShow,
      friendName: hkName
    });
    // 当练习电话不为空时
    // if(linkPhone){
    //   // 获取联系人电话
    //   wx.makePhoneCall({
    //     phoneNumber: linkPhone
    //   });
    // } else {
    //   wx.showToast({
    //     title: '联系人电话为空,请联系客服人员',
    //     icon: "none"
    //   });
    // }
  },
  /**
   * 隐藏加密号码弹出层
   */
  dialingHiddenMethod: function (opt) {
    this.setData({
      dialingFlag: false
    });
  },
  /**
   * 拨打电话号
   */
  dialingMethod: function (opt) {
    var that = this;
    // 处理号码
    wx.showLoading({
      title: '号码解析中',
      mask: true
    });
    // 绑定账号关系
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxHouse/bandPhone",
      data: {
        openId: app.globalData.openId,
        friendPhone: that.data.hkTell,
        myTell: app.globalData.agentInfo.tell
      },
      dataType: "json",
      method: "GET",
      success: function (res) {
        debugger
        var secretData = res.data.data;
        that.dialingHiddenMethod();
        if (res == null || res.data == null || res.data.data == null) {
          wx.hideLoading();
          wx.showToast({
            title: '解析失败,请联系客服人员',
            icon: "none"
          });
        } else {
          if (secretData.secretNo != null || secretData.secretNo != "") {
            // 绑定账号关系成功后，发送消息内容为"尝试拨打电话,点击顶部按钮重新拨号"
            // that.setData({
            //   messageDetail: "尝试拨打电话。"
            // });
            // // 发送信息
            // that.sendMessage();
            // //存储subsId
            // // var subsId = secretData.secretNo;
            // // 延时关闭
            wx.hideLoading();
            wx.makePhoneCall({
              phoneNumber: secretData.secretNo
            });
          } else {
            wx.hideLoading();
            wx.showToast({
              title: '解析失败,请联系客服人员',
              icon: "none"
            });
          }
        }
      }
    })
  }
})