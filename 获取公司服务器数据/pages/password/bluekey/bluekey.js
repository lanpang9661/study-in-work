// pages/password/bluekey/bluekey.js
var app = getApp()
Page({
  connectDeviceIndex:1,
  searchFlag:false,
  /**
   * 页面的初始数据
   */
  data: {
    houseId: "",
    lockCode: "",
    deviceId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lockCode = options.lockCode;
    if (lockCode.indexOf("UN ") == -1){
      lockCode = "UN " + lockCode;
    }
    // 从父界面获取数据
    this.setData({
      houseId: options.houseId,
      lockCode: lockCode

    });
    wx.getSystemInfo({
      success: function (res) {
        if (res.system == 'android'){
          wx.showToast({ title: "如果无法打开门锁，请开启手机定位功能", icon: 'none' });
        }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    this.closeSearch();
    this.closeAdapter();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    this.closeSearch();
    this.closeAdapter();
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

  },
  /**
   * 搜索附近蓝牙，之前先判断本机是否开启蓝牙
   * 第一步
   */
  searchBluetooth: function () {
    var that = this;
    if(that.searchFlag == false){
      wx.openBluetoothAdapter({
        success: function (res) {
          that.searchNearBluetooth();
        },
        fail(res) {
          if (res.errCode == 10001) {
            wx.showToast({ title: "错误：蓝牙未开启", icon: 'none' });
          }
        },
      })
    }
  },
  /**
   * 搜索附近蓝牙
   * 第二步
   */
  searchNearBluetooth:function (){
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      success: function (res) {
        that.getFoundBluetooth();
      },
      fail: function (res) {
        //蓝牙如果开启失败会进入这个方法，统一认为未开启
        wx.showToast({ title: "错误：蓝牙未开启", icon: 'none' });
      },
      complete: function (res) {
        // 蓝牙状态成功和失败都会调用，不做任何处理
      }
    })
  },
  /**
   * 获取已发现的设备
   * 第三步
   */
  getFoundBluetooth:function(){
    wx.showLoading({
      title: '搜索设备中'
    });
    var that = this;
    var timerSearch = false;
    wx.onBluetoothDeviceFound(function (res) {
      var isnotExist = true
      //兼容处理有的手机搜索的蓝牙设备值是不同的
      if (res.deviceId) { // 某些android进入这里
        if (res.localName == that.data.lockCode) {
          that.connectionBluetooth(res.deviceId);
          that.closeSearch();
          that.searchFlag = true;
          timerSearch= true;
        }
      } else if (res.devices) {//iphone7 plus 进入的是这里
        for (var i = 0; i < res.devices.length; i++) {
          if (res.devices[i].localName == that.data.lockCode) {
            that.connectionBluetooth(res.devices[i].deviceId);
            that.closeSearch();
            that.searchFlag = true;
            timerSearch = true;
            break;
          }
        }
      } else if (res[0]) { // 某些android进入这里
        for (var i = 0; i < foundDevice.length; i++) {
          if (res[0].localName == that.data.lockCode) {
            that.connectionBluetooth(res.devices[i].deviceId);
            that.closeSearch();
            that.searchFlag = true;
            timerSearch = true;
            break;
          }
        }
      }
    })
    setTimeout(function (){
      if (timerSearch == false){
        that.closeSearch();
        that.closeAdapter();
        wx.hideLoading();
        wx.showToast({ title: "未搜索到设备,请重新申请", icon: 'none' });
      }
    },20000);
  },
  closeSearch:function (){
    var that = this;
    that.searchFlag = false;
    
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
      }
    });
  },
  closeAdapter:function (){
    var that = this;
    that.searchFlag = false;
    wx.closeBluetoothAdapter({
      success: function (res) {

      }
    })
  },
  /**断开蓝牙设备*/
  closeBLEConnection: function (deviceId) {
    var that = this;
    that.searchFlag = false;
    wx.closeBLEConnection({
      deviceId: deviceId + "",
      success: function (res) {
        //  wx.showToast({ title: "已断开连接", icon: 'none' });
      }
    })
  },
  /**连接蓝牙设备*/
  connectionBluetooth: function (deviceId){
    wx.hideLoading();
    wx.showLoading({ title: "正在连接设备"});
    var that = this;
    wx.createBLEConnection({
      deviceId: deviceId,
      success: function (res) {
        if (res.errCode == 0) {
          wx.getBLEDeviceServices({
            deviceId: deviceId,
            success: function (res) {
              wx.hideLoading();
              wx.showToast({ title: "设备已连接", icon: 'none' });
              that.getDeviceCharacter(deviceId, res.services[0].uuid)
            }
          });
        }
      },
      fail: function (res) {
        console.log(res.errCode);

        if (res.errCode == '10003') {
          if (that.connectDeviceIndex < 6) {
            that.connectionBluetooth(deviceId);
          }
          that.connectDeviceIndex = that.connectDeviceIndex + 1;
        }
        else {
          that.closeBLEConnection(deviceId);
          that.closeAdapter();
          wx.hideLoading();
          wx.showToast({ title: "连接失败，请重新申请开锁", icon: 'none' });
        }
      },
      complete: function (res) {
        //连接失败重新连接
        this.isConnectting = false;
      }
    });
  },
  getDeviceCharacter(deviceId, serviceId) {
    let _this = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId,
      success: function (res) {
        let notify_id, write_id;
        //开启监听
        let charc = res.characteristics[1];
        _this.openNotify(deviceId, serviceId, charc.uuid);
        //开锁，写入命令
        charc = res.characteristics[0];
        setTimeout(function () {
          _this.openLock(deviceId, serviceId, charc.uuid, 'FF0CA20102030405065500EF');
        }, 1000)
      }
    })
   
  },
  /**开启监听*/
  openNotify(deviceId, serviceId, notifyId) {
    var _this = this;
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: notifyId,
      complete(res) {
        wx.onBLECharacteristicValueChange(function (res) {
          var equan = _this.arrayBufferToHexString(res.value);
          //如果大于11说明是获取电量的回调
          if(equan.length > 11){
            _this.insertTakeInfo(app.globalData.openId, _this.data.houseId, app.globalData.agentInfo.id, equan);
            _this.closeBLEConnection(deviceId);
            _this.closeAdapter();
          }
        })
      }
    })
    //this.openLock(device_id, service_id, notify_id,'FF0CA20102030405065500EF');
  },
  //获取电量
  getElectricQuantity: function (deviceId, serviceId, characteristicId, buffer){
    var that = this;
    var typedArray = new Uint8Array(buffer.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    wx.writeBLECharacteristicValue({
      deviceId: deviceId + "",
      serviceId: serviceId + '',
      characteristicId: characteristicId + '',
      // 这里的value是ArrayBuffer类型
      value: typedArray.buffer,//typedArray.buffer,
      success: function (res) {

      },
      fail: function (res) {

      }
    });
  },
  //开锁
  openLock: function (deviceId, serviceId, characteristicId, buffer) {
    var that = this;
    var typedArray = new Uint8Array(buffer.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))

    wx.writeBLECharacteristicValue({
      deviceId: deviceId + "",
      serviceId: serviceId + '',
      characteristicId: characteristicId + '',
      // 这里的value是ArrayBuffer类型
      value: typedArray.buffer,//typedArray.buffer,
      success: function (res) {
        wx.showToast({ title: "设备已打开", icon: 'none' });
        //开启获取电量
        that.getElectricQuantity(deviceId, serviceId, characteristicId, 'FF05A301EF');
      },
      fail: function (res) {

      }
    });
  },
  /**二进制转字符串*/
  arrayBufferToHexString: function (buffer){
    let bufferType = Object.prototype.toString.call(buffer)
    if (buffer != '[object ArrayBuffer]') {
      return
    }
    let dataView = new DataView(buffer);
    var hexStr = '';
    for (var i = 0; i < dataView.byteLength; i++) {
      var str = dataView.getUint8(i);
      var hex = (str & 0xff).toString(16);
      hex = (hex.length === 1) ? '0' + hex : hex;
      hexStr += hex;
    }
    return hexStr.toUpperCase();
  },
  /**符串转字二进制*/
  hexStringToArrayBuffer(str) {
    if (!str) {
      return new ArrayBuffer(0);
    }

    var buffer = new ArrayBuffer(str.length);
    let dataView = new DataView(buffer)

    let ind = 0;
    for (var i = 0, len = str.length; i < len; i += 2) {
      let code = parseInt(str.substr(i, 2), 16)
      dataView.setUint8(ind, code)
      ind++
    }

    return buffer;
  },
  
  /**
   * 确定点击处理
   */
  insertTakeInfo: function (openId, houseId, agentId,equan) {
    if (openId == null || houseId == null || agentId == null) {
      return false;
    }
    // 请求申请开锁
    wx.request({
      url: app.globalData.baseUrl + "/xcx/xcxTake/saveTake",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      dataType: "json",
      data: {
        openId: openId,
        refHouseSourceId: houseId,
        refAgentId: agentId,
        equan: equan
      },
      complete: function (res) {

      }
    })
  }
})