//-------------------------------------------小程序API封装
/**
 * 小程序:封装微信的ajax 
 *
 */
const request = data => {
  wx.request(data)
}
/**
 * 小程序: 获取系统信息
 */
const getSystemInfo = data =>{
  wx.getSystemInfo(data);
}
/**
 * 小程序: 微信登录小程序 
 */
const login = data => {
  wx.login(data);
}
/**
 * 小程序：获取微信用户信息
 */
const getUserInfo = data =>{
  wx.getUserInfo(data);
}
/*
 * 小程序:获取设置
 */
const getSetting = data =>{
  wx.getSetting(data);
}
/*
* 小程序:隐藏加载
*/
const hideLoading = data => {
  wx.hideLoading();
}
//------------------------------------------自定义相关封装
/**
 * 自定义：校验用户是否注册
 */
const userVirefy = data => {

}
module.exports = {
  request: request,
  getSystemInfo: getSystemInfo,
  login: login,
  getUserInfo: getUserInfo,
  getSetting: getSetting
}