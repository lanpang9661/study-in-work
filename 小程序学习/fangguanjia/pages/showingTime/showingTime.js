// pages/showingTime/showingTime.js
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();

const nowDay = [];
const startHours = [];
const endHours = [];

for(var i=0; i<30; i++){
  nowDay.push(year + '年' + (month + 1) + '月' + (day + i) + '日')
}

for(var i=0; i<24; i++){
  startHours.push(i+':00');
  endHours.push(i+':00');
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [nowDay, startHours, endHours],
    multiIndex: [0,0,0],
    appointmentArr: []
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

  },
  bindMultiPickerChange(e){
    // console.log(this.data.multiArray[0][e.detail.value[0]]);
    // console.log(this.data.multiArray[1][e.detail.value[1]]);
    // console.log(this.data.multiArray[2][e.detail.value[2]]);

    // 每次进入函数声明一个变量判断是否该日期存在
    var isExist = false;
    var appointmentArr = this.data.appointmentArr;

    // 遍历预约看房时间函数，如果有该天的对象，那么将isexit变为true，并且在该日期所在的对象下的children中push需要添加的时间
    appointmentArr.forEach((item, index, arr) => {
      if (item.day === this.data.multiArray[0][e.detail.value[0]]){
        item.children.push(this.data.multiArray[1][e.detail.value[1]] + '-' + this.data.multiArray[2][e.detail.value[2]])
        isExist = true
      }
    })

    // 如果该天不存在，那么appointmentArr push一个对象，该对象的day字段赋值该日期
    if(!isExist){
      appointmentArr.push({
        day: this.data.multiArray[0][e.detail.value[0]],
        children: [
          this.data.multiArray[1][e.detail.value[1]] + '-' + this.data.multiArray[2][e.detail.value[2]]
        ]
      })
    }

    
    this.setData({
      appointmentArr: appointmentArr
    })


  },
  bindMultiPickerColumnChange(e){
    
  }
})