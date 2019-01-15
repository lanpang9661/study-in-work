var MyPage = function (app){
  this.currentPage=1;
  this.rowCount=10;
  this.dataList=null;
  this.nowTime=null;
  this.param = null;
  this.noMore = true;
  this.isEmpty = false;
  this.excutePage = function (param){
    this.param =param;
    if (param.currentPage){
      this.currentPage = this.param.currentPage;
    }else{
      this.param.data.currentPage = this.currentPage;
    }
    if (param.rowCount){
      this.rowCount = param.rowCount;
    }else{
      this.param.data.rowCount = this.rowCount;
    }
    this.request();
  };
  this.request = function (){
    let pThis = this;
    wx.request({
      url: this.param.url,
      data: this.param.data,
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: "POST",
      dataType: "json",
      complete: function (res) {
        if (!res.data.data.pagerResults || res.data.data.pagerResults.length == 0){
          if(pThis.currentPage == 1){
            pThis.isEmpty = true;
          }
          pThis.noMore = true;
        }else{
          pThis.noMore = false;
        }
        if (pThis.dataList == null || pThis.dataList.length == 0){
          pThis.dataList = res.data.data.pagerResults
        }else{
          pThis.dataList = pThis.dataList.concat(res.data.data.pagerResults);
        }
        app.setData({
          myPage: pThis
        });
      }
    })
  };
  this.nextPage= function(){
    this.param.data.currentPage ++;
    this.request();
  }
}
var createPage = function (app){
  return new MyPage(app);
}
module.exports = {
  createPage: createPage
}