// pages/waitAuth/waitAuth.js
let app = getApp();
var stringAssistant = require('../../Assistant/StringAssistant.js')
// let WebIM = require("../../utils/WebIM")["default"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.checkUserinfo();
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
    this.checkUserinfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
    return require('../../utils/forwardConfig.js').default;
  },
  checkUserinfo: function (fun) {
    var that = this
    wx.login({
      success: res1 => {
        const code = res1.code;
        wx.getUserInfo({
          success: res2 => {
            app.globalData.userInfo = res2.userInfo
            wx.request({
              //获取openid接口  
              url: app.globalData.baseUrl + '/xcx/xcxMyInfo/getOpenId',
              data: {
                code: code,
                encryptedData: res2.encryptedData,
                iv: res2.iv
              },
              method: 'GET',
              success: function (res3) {
                const unionId = res3.data.unionId;//获取到的unionId
                const openId = res3.data.openId;//获取到的openid  
                app.globalData.openId = openId;
                app.globalData.unionId = unionId;
                app.globalData.agentInfo = res3.data.userInfo;
                that.userAuth();
                // var huanAccount = "";
                // if (res3.data.huanAccount) {
                //   huanAccount = res3.data.huanAccount;
                // }
                // wx.setStorage({
                //   key: "myUsername",
                //   data: huanAccount
                //   // data: "xmz2018"
                // });
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
                wx.stopPullDownRefresh();
              }
            })
          }
        })
      }
    })
  },
  userAuth: function () {
    this.userJump(app.globalData.agentInfo);
  },
  userJump: function (data) {
    let status = 5;
    let recommendUnionId = "";
    if (data) {
      status = data.status;
    }
    //1:系统用户,2:待审核,3:审核失败,4:未启用系统用户,5:未注册
    switch (status) {
      case 1: {
        wx.reLaunch({
          url: '/pages/housing/housing'
        })
      } break;
      case 2: {
        wx.stopPullDownRefresh();
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
  /**
   * 获取好友列表，加入缓存中
   */
  // getMemberList: function (id) {
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