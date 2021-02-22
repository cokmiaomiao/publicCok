Page({

  /**
   * 页面的初始数据
   */
  data: {
    magic:{}
  },
  action:function(e){
    var id=e.currentTarget.dataset.key;
    var value=this.data.magic[id];
    value=JSON.stringify(value);
    wx.navigateTo({
      url: '/pages/mofa_details/mofa_details?id='+id+'&value='+value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database({});
    const table=db.collection('cok');
    table.doc('magic').get({
      success:function(res){
        that.setData({
          magic:res.data
        })
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