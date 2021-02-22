Page({
  data: {
    fight:["最强王国","神秘海域","边境矿脉"],
    isHide:true,
    isBlock:false,
    userInfo:null,
  },
  bindGetUserInfo: function(res) {
    console.log(res)
        if (res.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
            isHide: false,
            isBlock:true
          });
        } else {
          //用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法获取个人信息，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                console.log('用户点击了“返回授权”');
              }
            }
          });
        }
     },
  action:function(e){
    var id=e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/disscuss_details/disscuss_details?id='+id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const app = getApp();
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
        that.setData({
            userInfo: userInfo
        });
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 1000,
        mask:true
      })
    }
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