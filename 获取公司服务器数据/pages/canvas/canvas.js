var app = getApp()
// pages/canvas/canvas.js
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
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.draw();
      }
    });
    
  },
  draw: function (){
    let tempUrls = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526012572041&di=181161f35566a1f1de026bbbb0656629&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F25%2F51%2F56958PICSuN_1024.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526012572041&di=181161f35566a1f1de026bbbb0656629&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F25%2F51%2F56958PICSuN_1024.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526012572041&di=181161f35566a1f1de026bbbb0656629&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F25%2F51%2F56958PICSuN_1024.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526012572041&di=181161f35566a1f1de026bbbb0656629&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F25%2F51%2F56958PICSuN_1024.jpg",
      app.globalData.baseUrl + '/xcx/xcxHouse/xcx/xcxGenerateQrCode?openId=' + app.globalData.openId +'&qrUrl='+111]

    let getFilePS = tempUrls.map((path)=>{
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: path, //仅为示例，并非真实的资源
          success: function (res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res.tempFilePath)
            }
          },
          fail: function (err) {
            reject(err)
          }
        })
      });
    })


    Promise.all(getFilePS).then(function (posts) {
      
    }).catch(function (reason) {

    });




    const width = 750, height = 1334;
    const ctx = wx.createCanvasContext('myCanvas');

    //上部白色背景
    ctx.drawImage("/resources/image/canvas/bai.png", 0, 0, width, 923);
    //下部橙色背景
    ctx.drawImage("/resources/image/canvas/hong.png", 0, 923, width, height);
    //六张楼盘分享图
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 32, 32, 334, 250);
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 384, 32, 334, 250);
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 32, 300, 334, 250);
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 384, 300, 334, 250);
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 32, 586, 334, 250);
    ctx.drawImage("/resources/image/canvas/tutu.jpg", 384, 586, 334, 250);
    //中部白色背景
    ctx.drawImage("/resources/image/canvas/Rectangle 24.png", 21, 808, 707, 395);
    //标题
    ctx.setFontSize(32)
    ctx.setFillStyle("#333333")
    let top = 875;
    let title = "高新园区黄浦路新科花园一期24号楼三单元";
    let zishu = 12, hang = title.length / zishu;
    for (let i = 0; i < hang;i++){
      if (title.length > (i + 1) * zishu){
        const t = title.substring(i * zishu, (i + 1)*zishu)
        ctx.fillText(t, 72, top)
      }else{
        const t = title.substring(i * zishu)
        ctx.fillText(t, 72, top)
      }
      top+=38;
    } 
    //二维码
    ctx.drawImage("/resources/image/canvas/erweima.png", 556, 850, 132, 130);

    //价格等文字
    ctx.setFontSize(28)
    ctx.setFillStyle("#999999")
    ctx.fillText("价格", 62, 978)
    ctx.fillText("户型", 220, 978)
    ctx.fillText("面积", 411, 978)
    //价格下面的值
    ctx.setFontSize(28)
    ctx.setFillStyle("#F87100")
    ctx.fillText("98.86万", 61, 1023)
    ctx.fillText("3室1厅1卫", 220, 1023)
    ctx.fillText("109.95㎡", 411, 1023)

    //经纪人信息分割线
    ctx.drawImage("/resources/image/canvas/hui.png", 62, 1095, 626, 1);

    //经纪人信息
    ctx.setFontSize(28)
    ctx.setFillStyle("#666666")
    ctx.fillText("经纪人: 王建国 189 4510 1591", 200, 1148)

    //底部转发文字
    ctx.setFontSize(30)
    ctx.setFillStyle("#FFFFFF")
    ctx.fillText('欢迎长按识别该房源二维码', 200, 1263)

    //好房分享
    ctx.drawImage("/resources/image/canvas/haofangfenxiang.png", 61, 0, 210, 72);


    // // 红色背景
    // ctx.setFillStyle('#F87100')
    // ctx.fillRect(0, 0, width, height);
    // //logo
    // ctx.drawImage("/resources/image/canvas/logo.png", 289, 61, 173, 52);
    // // 上部分白色底
    // ctx.setFillStyle('#fff')
    // ctx.fillRect(32, 162, 686, 520);
    // // 上部分房源图片
    // ctx.drawImage("/resources/image/canvas/tutu.jpg", 57, 187, 636, 470);
    // // 中部分白色底
    // ctx.setFillStyle('#fff')
    // ctx.fillRect(32, 714, 686, 639);
    // //房源标题
    // ctx.setFontSize(32)
    // ctx.setFillStyle("#333333")
    // let top = 765;
    // let title = "富丽庭，南北通透，豪华装修带阳台，稀缺房子 可以过户，房主好说话房主真的是超级好说话";
    // let zishu = 18, hang = title.length / zishu;
    // for (let i = 0; i < hang;i++){
    //   if (title.length > (i + 1) * zishu){
    //     const t = title.substring(i * zishu, (i + 1)*zishu)
    //     ctx.fillText(t, 72, top)
    //   }else{
    //     const t = title.substring(i * zishu)
    //     ctx.fillText(t, 72, top)
    //   }
    //   top+=38;
    // } 
    // //上架时间
    // ctx.setFontSize(28)
    // ctx.setFillStyle("#999999")
    // top += 33;
    // ctx.fillText('上架时间:2018-05-09', 72, top)
    // //标题
    // let topTitle=top+95;
    // let topTitleHeight=53;
    // ctx.fillText('面积：', 72, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('价格：', 72, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('户型：', 72, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('单价：', 72, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('楼盘：', 72, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('地址：', 72, topTitle)
    // //内容
    // ctx.setFillStyle("#333333")
    // topTitle = top + 95;
    // ctx.fillText('56㎡', 178, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('580万', 178, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('三室两厅一卫', 178, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('14000/平', 178, topTitle)
    // topTitle += topTitleHeight;
    // ctx.fillText('富丽庭美达源丽婷美达盘', 178, topTitle)
    // topTitle += topTitleHeight;
    // //地址单独处理
    // // ctx.fillText('大连沙河口甘井子区黑石礁剑山街甘井子黑石礁 剑山街5单元1号501', 178, topTitle)
    // title = "大连沙河口甘井子区黑石礁剑山街甘井子黑石礁 剑山街5单元1号501";
    // zishu = 18, hang = title.length / zishu;
    // for (let i = 0; i < hang; i++) {
    //   if (title.length > (i + 1) * zishu) {
    //     const t = title.substring(i * zishu, (i + 1) * zishu)
    //     ctx.fillText(t, 178, topTitle)
    //   } else {
    //     const t = title.substring(i * zishu)
    //     ctx.fillText(t, 178, topTitle)
    //   }
    //   topTitle += 35;
    // }  



    // // 底部分白色底
    // ctx.setFillStyle('#fff')
    // ctx.fillRect(32, 1385, 686, 272);
    // // 底部二维码
    // ctx.drawImage("/resources/image/canvas/erweima.png", 178, 1417, 160, 158);
    // // 底部指纹
    // ctx.drawImage("/resources/image/canvas/zhiwen.png", 430, 1426, 142, 137);
    // // 底部文字
    // ctx.setFontSize(28)
    // ctx.setFillStyle("#F97101")
    // ctx.fillText('长按指纹识别图中二维码', 208, 1630)


    ctx.draw(true,function(){
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          wx.previewImage({
            urls: [res.tempFilePath] // 需要预览的图片http链接列表
          })
          console.log(res.tempFilePath)
        }
      })
    });
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
  
  }
})