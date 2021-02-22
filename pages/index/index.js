
Page({
  //特效
  containerTap: function (res) {
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: ''
    });
    this.setData({
      rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.4s linear;animation:ripple 0.4s linear;'
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    menu_c:{},
    menu_s:{},
    remark:'',
    statement:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database();
    const table=db.collection('cok');
    table.doc('index').get({
      success:function(res){
        that.setData({
          menu_c:res.data.menu_c,
          menu_s:res.data.menu_s,
          remark:res.data.remark,
          statement:res.data.statement
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
    return{
      path:"pages/index/index",
      imageUrl:"https://636f-co-872-1259111184.tcb.qcloud.la/cok/erweima1.png?sign=c2c182496f2d2f7bcfabfa4ecdff10ff&t=1583777034"
    }
  }
})