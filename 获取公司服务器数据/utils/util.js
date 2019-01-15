const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const toastError = res => {
  var error = "哎呀，出问题了"
  if (res.data && res.data.msg && res.data.msg.length > 0) {
    error = res.data.msg
  }
  wx.showToast({
    title: error,
    icon: 'none'
  })
}
const fxQrCode =  function (url,openId) {
  wx.showLoading({
    title: '正在生成二维码',
  })
  wx.request({
    //获取openid接口  
    url: url,
    data: {
      openId: openId,
      page: 'pages/welcome/welcome',
      width: 430
    },
    dataType: "json",
    method: 'GET',
    complete: function (res3) {
      wx.hideLoading();
      let filepath = "http://snailhome.oss-cn-huhehaote.aliyuncs.com" + res3.data.data.filePath + '@!noResize';
      wx.previewImage({
        // 当前显示图片的http链接
        // 需要预览的图片http链接列表
        urls: [filepath]
      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  toastError: toastError,
  fxQrCode: fxQrCode
}