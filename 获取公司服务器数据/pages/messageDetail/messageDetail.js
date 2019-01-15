// let WebIM = require("../../utils/WebIM")["default"];
var dialogAssistant = require('../../Assistant/DialogAssistant.js');
var util = require("../../utils/util");
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friendId: "",// 房主ID
    friendAccount:"",// 房主环信账号
    friendHeadImg: "",//  房主头像
    friendName: "",// 房主名称
    myId: "",// 我的Id
    myHeadImg:"",// 我的头像
    myUserName:"",// 我的环信账号
    myName:"", // 
    chatList:[],// 聊天记录集合
    messageDetail:"",// 发送详情
    sendReadFlag: true, // 发送已读标识
    showReplyFlag : false, // 显示快捷回复
    houseSourceInfo : {}, // 房源信息对象
    height: '',// 页面高度
    scrollTop: 0,
    myPhoneShow: '',// 手机号显示
    myPhoneHidden: '',// 手机号隐藏
    dialingFlag:false //拨号触发
  },
  /**
  * 隐藏加载中
  */
  dissmissLoading: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    // 好友ID
    var friendId = "";
    // 好友账号
    var friendName = "";
    // 好友账号
    var friendAccount = "";
    // 好友头像
    var friendHeadImg = "";
    // 我的ID
    var myId = "";
    // 我的头像
    var myHeadImg = "";
    // 我的名称
    var myName = "";
    // 我的手机号隐藏
    var myPhoneHidden = app.globalData.agentInfo.tell;
    // 我的手机号显示
    var myPhoneShow = String(myPhoneHidden);
    myPhoneShow = myPhoneShow.substr(0, 3) + "****" + myPhoneShow.substr(7); 
    
    if (options.friendId) {
      friendId = options.friendId;
    }
    if (options.friendAccount){
      friendAccount = options.friendAccount;
    }
    if (options.friendHeadImg) {
      friendHeadImg = options.friendHeadImg;
    }
    if (options.myHeadImg) {
      myHeadImg = options.myHeadImg;
    }
    if (options.myId) {
      myId = options.myId;
    }
    if (options.friendName) {
      friendName = options.friendName;
    }
    if (options.myId) {
      myName = options.myName;
    }
    var houseSourceInfo = "";
    // 对象
    if(options.houseDescription){
      houseSourceInfo = {
        houseDescription: options.houseDescription,
        huxing: options.huxing,
        mianji: options.mianji,
        moneySum: options.moneySum
      }
    }
    that.setData({
      friendAccount: friendAccount,
      friendHeadImg: friendHeadImg,
      myHeadImg: myHeadImg,
      myUserName: wx.getStorageSync("myUsername"),
      friendId: friendId,
      myId: myId,
      friendName: friendName,
      myName: myName,
      houseSourceInfo : houseSourceInfo,
      myPhoneShow: myPhoneShow,
      myPhoneHidden: myPhoneHidden
    });
    wx.setNavigationBarTitle({
      title: friendName//页面标题为路由参数
    });
    // 获取聊天数据
    that.getChatDetail();
    that.sendReadMessage();
    that.onTextMessage();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that = this;
    this.onTextMessage();
  },
  onTextMessage:function (){
    app.globalData.conn.listen({
      onTextMessage: function (message) {
        if (message) {
          console.log("消息详情明细一览");
          that.setData({
            sendReadFlag: true
          });
          // 保存聊天记录
          app.receiveMessage(message,function (){
            that.getChatDetail();
          });
          // 发送已读标识
          that.sendReadMessage();
        }
      },//收到消息送达服务器回执
      onReadMessage: function (message) {
        if (message && message.mid.indexOf("yz-") >= 0) {
          // if (message && message.mid.indexOf("YZ") >= 0) {
          app.updateMessageRandFlag(message.mid);
          setTimeout(function () {
            // 获取新的页面数据
            that.getChatDetail();
          }, 1000);
        }
      },
      onOpened: function (message) {

        console.log("messageDetail 打开socket");
        app.globalData.socketFlag = "true";
      },
      onClosed: function (message) {
        console.log("messageDetail 已关闭socket");
        app.globalData.socketFlag = "false";
      }
    });
  },
  onReady() {
  },
  /**
   * 退出后，打开socket长链接的监听
   */
  onUnload() {
    app.triggerSocket();
  },
  /**
   * 发送信息
   */
  sendMessage:function(e){
    console.log("Send");
    that = this;
    var data = that.data.messageDetail;
    that.setData({
      messageDetail: ""
    });
    var houseSourceInfo = that.data.houseSourceInfo;
    that.setData({
      houseSourceInfo: ""
    });
    if (data == "" || data == null){
      return false;
    }
    wx.request({
      url: app.globalData.baseUrl + "/api/social/addFriend",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      dataType: "json",
      data: {
        myId: that.data.myId,
        myAccount: that.data.myUserName,
        myType: "1",
        friendId: that.data.friendId,
        friendAccount: that.data.friendAccount,
        friendType: "2"
      },
      complete: function (res) {
        console.log(res);
        if (res == null || res.data == null || res.data.code != "1") {
          // 请求失败
          dialogAssistant.showToast('网络请求失败')
        } else {
          console.log("成功了",res);
          var friend = {
            id : res.data.data.id,
            friendAccount: that.data.friendAccount,
            friendId: that.data.friendId,
            friendType: "2",
            friendName: that.data.friendName ? that.data.friendName : "",
            friendHeadImg: that.data.friendHeadImg ? that.data.friendHeadImg : "",
            myAccount: that.data.myUserName,
            myType: "1",
            myId: that.data.myId,
            myHeadImg: that.data.myHeadImg ? that.data.myHeadImg:"",
            myName: that.data.myName ? that.data.myName : "",
            myCompanyName: app.globalData.agentInfo.companyShort ? app.globalData.agentInfo.companyShort : app.globalData.agentInfo.company
          };

          // 保存好友关系
          app.friendListSave(friend,"myself");
          // 当前登录人环信账号
          var imUserName = wx.getStorageSync("myUsername");
          // 好友环信账号
          var friendAccount = that.data.friendAccount;
          // 发送目标好友是否存在好友列表中的标识
          var id = app.globalData.conn.getUniqueId();                 // 生成本地消息id
          var msg = new WebIM.message('txt', id);      // 创建文本消息
          var sendTime = util.formatTime(new Date());
          msg.set({
            msg: data,                  // 消息内容
            to: friendAccount,                          // 接收消息对象（用户id）
            from: imUserName,
            // to: "xmzceshi", 
            roomType: false,
            ext: {
              "friend": friend,
              sendTime: sendTime,
              id: id,
              from: imUserName,
              to: friendAccount,
              houseSourceInfo: houseSourceInfo
            },
            success: function (id, serverMsgId) {
              console.log('send private text Success');
              // }, 1000);
            },
            fail: function (e) {
              console.log("Send private text error");
            }
          });
          msg.body.chatType = 'singleChat';
          app.globalData.conn.send(msg.body);
          // 转换message的值
          var messageList = new Array();
          var messageConvert = {
            id: id, // 消息Id
            type: "txt", // 消息类型
            from: imUserName, // 发送人
            to: friendAccount,// 接收人
            // to: "xmzceshi", 
            messageData: data, // 发送信息
            sendTime: sendTime, // 发送时间
            readFlag: "0", // 读取标识 1:未读 0为已读
            houseSourceInfo: houseSourceInfo
          };
          messageList.push(messageConvert);
          // msg.body.from = imUserName;
          app.saveMessage(messageList, friendAccount + imUserName);
          // setTimeout(function () {
          // 获取新的页面数据
          that.getChatDetail();
        }
        that.dissmissLoading()
      }
    })
  },
  /**
   * 获取聊天记录
   */
  getChatDetail:function(e){
    that = this;
    // 获取聊天详情
    var chatList = wx.getStorageSync("rendered_" + that.data.friendAccount + that.data.myUserName);
    // 当聊天记录不为空时
    if (chatList) {
      // 处理小红点
      that.handleDetail(chatList);
      that.setData({
        houseSourceInfo: ""
      });
    }
    // 当为第一次聊天时，发送房源信息
    else{
      if (that.data.houseSourceInfo) {
        that.setData({
          messageDetail: "房源信息"
        });
        that.sendMessage();
        that.setData({
          houseSourceInfo: ""
        });
      }
    }
    that.setData({
      chatList: chatList
    });
    // 刷新页面高度
    that.refreshWindow(chatList);
  },
  /**
   * 触发聊天input
   */
  messageDetailInput: function (e) {
    that = this;
    var value1 = e.detail.value;
    var value2 = value1;
    var value2 = value2.replace(/\s+/g, '');
    if (value2.length <= 0){
      //正则去空格
      // value1 = "";
      return false;
    }
    this.setData({
      messageDetail: value1
    })
  },
  /**
   * 发送已读的请求
   */
  sendReadMessage: function (message) {
    if (message) {
      console.log("已发送已读请求");
      // 处理未读消息回执
      var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
      ackMsg.set({
        id: message.id,
        to: that.data.friendAccount,
        // ackId: 
      });
      app.globalData.conn.send(ackMsg.body);
      return ;
    }
    if (that.data.sendReadFlag) {
      console.log("已发送已读请求");
      // 处理未读消息回执
      var ackMsg = new WebIM.message("read", WebIM.conn.getUniqueId());
      ackMsg.set({
        id: that.data.myUserName,
        to: that.data.friendAccount
      });
      app.globalData.conn.send(ackMsg.body);
      that.setData({
        sendReadFlag : false
      });
    }
    // that = this;
  },
  /**
   * 处理消息一览的小红点
   */
  handleDetail: function (chatList){
    // 获取自己的用户
    var myUserAccount = that.data.myUserName;
    // 获取好友的用户
    var friendAccount = that.data.friendAccount;
    // 把不是自己的聊天记录都修改为已读
    if(chatList){
      for(var i = 0 ;i < chatList.length ; i++){
        var chatInfo = chatList[i];
        // 默认显示普通类型的聊天
        chatInfo.showOne = true;
        // 把对方发的消息的未读标识都更新为已读
        if (chatInfo.from != myUserAccount && chatInfo.readFlag == "0") {
          chatInfo.readFlag = "1";
          that.sendReadMessage(chatInfo);
        }
        // 当类型为房源信息的时候,显示房源信息
        if(chatInfo.from == myUserAccount && chatInfo.houseSourceInfo){
          chatInfo.showOne = false;
        }
        // 处理聊天时间
        chatInfo.showTime = false;
        // for (var j = i + 1; j < chatList.length; j++) {
        var j = i - 1 ;
        if(j < 0){
          chatInfo.showTime = true;
        } else {
          // chatList[j].showTime = false;
          var chatInfo2 = chatList[j];
          //时间转换
          var chatInfotime = new Date(chatInfo.sendTime.replace(/\-/g, "/"));
          var chatInfo2time = new Date(chatInfo2.sendTime.replace(/\-/g, "/"));
          //当前时间
          // var now = new Date();
          var finsTime = that.prototype(chatInfotime, chatInfo2time);
          //如果不是当日的消息
          if (finsTime.day > 0) {
            //显示时间戳
            chatInfo.showTime = true;
            // break;
          } else {
            //如果不是当前小时的消息
            if (finsTime.hours > 0) {
              chatInfo.showTime = true;
              // break;
            } else {
              //
              if (finsTime.minutes <= 5) {
                if (finsTime.minutes == 5 && finsTime.seconds > 0){
                  chatInfo.showTime = true;
                } else {
                  //隐藏时间戳
                  chatInfo.showTime = false;
                }
                // break;
              } else {
                // if (finsTime.minutes == 5 && finsTime.seconds > 0){

                // }
                chatInfo.showTime = true;
                // break;
              }
            }
          }
        }
        // } 
      }
      wx.setStorageSync("rendered_" + friendAccount + myUserAccount, chatList);
    }
  },
  /**
   * 刷新页面高度
   */
  refreshWindow: function (chatList){
    // 获取页面高度
    var height = wx.getSystemInfoSync().windowHeight;
    // 获取集合长度
    var length = 0 ;
    if (chatList) {
      // 获取集合长度
      length = chatList.length;
    }
    setTimeout(function () {
      that.setData({
        // 1.计算页面上每一个item的标签的高
        // 2.用数组的获取的List的长度*每个item标签的高度（400是我目测的，说白了就是瞎写的，反正肯定比每个item的高度高，只要够高就行。）
        scrollTop: length * 700
      })
    }, 300);
  },
  /**
   * 发送快捷用语
   */
  sendQuickMessage:function(e){
    // 赋值
    that.setData({
      messageDetail: ""
    });
    // 发送消息
    that.sendMessage();

    // e.detail.value
  },
  /**
  * 时间差计算函数
  */
  prototype: function (faultDate, completeTime) {
    //天数
    var day = parseInt(faultDate.getDay()) - parseInt(completeTime.getDay());
    //小时
    var hour = parseInt(faultDate.getHours()) - parseInt(completeTime.getHours());
    //分钟
    var minute = parseInt(faultDate.getMinutes()) - parseInt(completeTime.getMinutes());
    //分钟
    var seconds = parseInt(faultDate.getSeconds()) - parseInt(completeTime.getSeconds());

    var map = { "day": day, "hours": hour, "minutes": minute, "seconds": seconds }
    return map;
  },
  /**
   * 显示拨号弹出层
   */
  dialingShowMethod:function(opt){
    this.setData({
      dialingFlag: true
    });
  },
  /**
   * 隐藏加密号码弹出层
   */
  dialingHiddenMethod:function(opt){
    this.setData({
      dialingFlag: false
    });
  },
  /**
   * 拨打电话号
   */
  dialingMethod:function(opt){
    var that = this;
    // 处理号码
    wx.showLoading({
      title: '号码解析中',
      mask:true
    });
    // 绑定账号关系
    wx.request({
      url: app.globalData.baseUrl + "/api/social/getAgentTell",
      data: {
        id: that.data.friendId,
        myTell: that.data.myPhoneHidden
      },
      dataType: "json",
      method: "GET",
      success: function (res) {
        // debugger
        var secretData = res.data.data;
        that.dialingHiddenMethod();
        if (res == null || res.data == null || res.data.data.code != "1") {
          wx.hideLoading();
          wx.showToast({
            title: '解析失败,请联系客服人员',
            icon: "none"
          });
        } else {
          if (secretData.secretNo != null || secretData.secretNo != "") {
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