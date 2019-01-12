const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    countryArr: [ '中国', '日本' , '美国' ],
    nowCountryIndex: 0,
    multiArr: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiArrIndex: [0,0,0],
    time: '09:01',
    date: '2019-01-12',
    nowCity: [ '广东省', '广州市', '黄埔区' ]
  },
  countryChangeFn(e){
    this.setData({
      nowCountryIndex: e.detail.value
    })
  },
  timeChangeFn(e){
    this.setData({
      time: e.detail.value
    })
  },
  dateChangeFn(e) {
    this.setData({
      date: e.detail.value
    })
  },
  cityChangeFn(e){
    this.setData({
      nowCity: [[e.detail.value[0]], [e.detail.value[1]], [e.detail.value[2]]]
    })
  },
  bindMultiPickerChange(e){
    console.log(e.detail)
  },
  bindMultiPickerColumnChange(e){
    var data = {
      multiArr: this.data.multiArr,
      multiArrIndex: this.data.multiArrIndex
    };
    data.multiArrIndex[e.detail.column] = e.detail.value;
    // console.log(data.multiArrIndex);
    if( data.multiArrIndex[0] === 0 ){
      data.multiArr[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
      data.multiArr[2] = ['猪肉绦虫', '吸血虫'];

      switch ( data.multiArrIndex[1] ) {
        case 0:
          data.multiArr[2] = ['猪肉绦虫', '吸血虫'];
          break;
        case 1:
          data.multiArr[2] = ['蛔虫'];
          break;
        case 2:
          data.multiArr[2] = ['蚂蚁', '蚂蟥'];
          break;
        case 3:
          data.multiArr[2] = ['河蚌', '蜗牛', '蛞蝓'];
          break;
        case 4:
          data.multiArr[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
          break;

      }

    }else{
      data.multiArr[1] = ['鱼', '两栖动物', '爬行动物'];
      data.multiArr[2] = ['鲫鱼', '带鱼'];
      switch (data.multiArrIndex[1]){
        case 0:
          data.multiArr[2] = ['鲫鱼', '带鱼'];
          break;
        case 1:
          data.multiArr[2] = ['青蛙', '娃娃鱼'];
          break;
        case 2:
          data.multiArr[2] = ['蜥蜴', '龟', '壁虎'];
          break;
      }
    }

    this.setData({
      multiArr: data.multiArr,
      multiArrIndex: data.multiArrIndex
    })
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
    
  }
})