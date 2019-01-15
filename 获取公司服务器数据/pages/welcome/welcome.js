let app = getApp();
// 定义String工具类
var stringAssistant = require('../../Assistant/StringAssistant.js')
var dialogAssistant = require('../../Assistant/DialogAssistant.js');
var wxApi = require('../../utils/wxApi.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    isflag:false,
    show1:false,//微信版本升级
    houseSourceId:'',
    logNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //设置推荐人uinoid,如果扫码新用户进来有推荐人的unionid
    let recommendUnionId = null;
    if (options.query && options.query.unionId) {
      recommendUnionId = options.query.unionId;
      wx.setStorageSync("recommendUnionId", recommendUnionId);
    } else if (options.unionId) {
      recommendUnionId = options.unionId;
      wx.setStorageSync("recommendUnionId", recommendUnionId);
    }
    if (options.query && options.query.houseSourceId){
      that.setData({
        houseSourceId: options.query.houseSourceId
      })
    }else if (options.houseSourceId){
      that.setData({
        houseSourceId: options.houseSourceId
      })
    }
    this.getVersion();
    //获取缓存里的登录次数
    wx.getStorage({
      key: 'logNum',
      success(res) {
        that.setData({
          logNum:res.data
        })
        console.log('logNum:'+res.data);
        console.log('logNum:'+that.data.logNum);
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
    var that = this;
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
    wx.hideLoading()
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
  checkUserinfo: function (fun) {
    var that = this
    that.setData({
      show: false
    });
    wxApi.login({
      success: res2 => {
        const code = res2.code;
        wxApi.getUserInfo({
          success: res1 => {
            app.globalData.userInfo = res1.userInfo;
            wxApi.request({
              //获取openid接口  
              url: app.globalData.baseUrl + '/xcx/xcxMyInfo/getOpenId',
              data: {
                code: code, 
                encryptedData: res1.encryptedData,
                iv: res1.iv
              },
              method: 'GET',
              success: function (res3) {
                const unionId = res3.data.unionId;//获取到的unionId
                const openId = res3.data.openId;//获取到的openid  
                app.globalData.openId = openId;
                app.globalData.unionId = unionId;
                app.globalData.agentInfo = res3.data.userInfo;
                // 当userInfo不为空时,登录环信
                if (res3.data.userInfo) {
                  // var info = res3.data.userInfo;
                  var huanAccount = "";
                  if (res3.data.huanAccount){
                    huanAccount = res3.data.huanAccount;
                  }
                  wx.setStorage({
                    key: "myUsername",
                    data: huanAccount
                  });
                  // var options1 = {
                  //   apiUrl: WebIM.config.apiURL,
                  //   user: huanAccount,
                  //   pwd: "123456",
                  //   // user: "xmz2018",
                  //   // pwd: "xuyi1234",
                  //   appKey: WebIM.config.appkey
                  // };
                  // app.globalData.conn.open(options1);
                  // 获取好友列表，加入缓存中
                  // that.getMemberList(app.globalData.agentInfo.id);
                }
                if (res3.data.userInfo && that.data.houseSourceId) {
                  let hId = that.data.houseSourceId;
                  wx.reLaunch({
                    url: "../houseDetail/HouseDetail?showShouYe=1&id=" + hId
                  });
                }else{
                  that.userAuth();
                }
              }
            })

          }, fail: function (res) {
            that.setData({
              show: true
            });
          }
        })
       
      }
    })
  },
  userAuth: function () {
    this.userJump(app.globalData.agentInfo);
  },
  userJump: function (data) {
    var that = this;
    let status = 5;
    let recommendUnionId = "";
    if (data) {
      status = data.status;
    }
    if (status==1){
      var logNum = that.data.logNum+1;
      wx.setStorage({
        key: 'logNum',
        data: logNum
      })
    }
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (status) {
      case 1: {
        wx.reLaunch({
          url: '/pages/housing/housing'
        })
      } break;
      case 2: {
        wx.reLaunch({
          url: '/pages/waitAuth/waitAuth'
        })
      } break;
      case 3: {
        wx.reLaunch({
          url: '/pages/registerFail/registerFail?reason=' + stringAssistant.nonNull(data.reason) + '&agentId=' + stringAssistant.nonNull(data.id)
        })
      } break;
      case 4: {
        // 账号停用
        wx.reLaunch({
          url: '/pages/accountDisabled/accountDisabled'
        })
      } break;
      case 5: {
        wx.reLaunch({
          url: '/pages/register/register'
        })
      } break;
      default: { }
    }
  },
 
  getVersion: function () { //微信版
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var version = res.SDKVersion;
        version = version.replace(/\./g, "")
        if (parseInt(version) < 207) { // 小于1.2.0的版本
          that.setData({
            isflag: true,
          })
        }else{
          wxApi.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                that.updateManager();
              } else {
                that.setData({
                  show: true,
                })
              }
            }
          })
          
        }
      }
    })
  },
  onShareAppMessage: function () {
    return require('../../utils/forwardConfig.js').default;
  },
  updateManager() {
    let that = this;
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if(!res.hasUpdate){
        that.checkUserinfo();
      }
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          updateManager.applyUpdate()
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  },
  /**
   * 获取好友列表，加入缓存中
   */
  // getMemberList:function(id){
  //   wx.request({
  //     url: app.globalData.baseUrl + "/api/social/getSocialList",
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     method: "GET",
  //     dataType: "json",
  //     data: {
  //       currentPage: 1,
  //       rowCount: 30,
  //       senderId: id
  //     },
  //     complete: function (res) {
  //       if (res == null || res.data == null || res.data.code != "1") {
  //         // 请求失败
  //         dialogAssistant.showToast('网络请求失败')
  //       } else {
  //         // 好友列表集合
  //         var friendList = res.data.data;
  //         // 环信账号
  //         var myName = wx.getStorageSync("myUsername");
  //         // 循环此集合,查询出该聊天人的最后一天信息和日期
  //         for (var i = 0; i < friendList.length; i++) {
  //           var friend = friendList[i];
  //           // 获取对方的环信账号名称
  //           let friendAccount = friend.friendAccount;
  //           // 获取双方聊天内容
  //           var chatList = wx.getStorageSync("rendered_" + friendAccount + myName);
  //           // 获取最后聊天的记录
  //           let lastChat = "";
  //           // 获取最后聊天时间
  //           let lastDate = "";
  //           if (chatList) {
  //             var chat = chatList[chatList.length - 1];
  //             lastChat = chat.messageData;
  //             lastDate = chat.sendTime;
  //           }
  //           friend.lastChat = lastChat;
  //           friend.lastDate = lastDate;
  //         }
  //         wx.setStorageSync("friendList", friendList);
  //         // 判断小红点是否显示
  //         app.handleMenuMessage("login");
  //       }
  //     }
  //   })
  // }
})