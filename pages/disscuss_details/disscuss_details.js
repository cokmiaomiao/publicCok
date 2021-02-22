Page({
  data: {
    id:'',
    _id:'',
    add1:false,
    fight:null,
    find:null,
    findDisplay:true,
    sub:{
      kingdom:'',
      player:'',
      phone:'',
      other:''
    }
  },
  findKingdom:function(e){
    this.setData({
      find:e.detail.value
    })
  },
  subKingdom:function(e){
    var str='sub.kingdom'
    this.setData({
      [str]:e.detail.value
    })
  },
  subPlayer:function(e){
    var str='sub.player'
    this.setData({
      [str]:e.detail.value
    })
  },
  subPhone:function(e){
    var str='sub.phone'
    this.setData({
      [str]:e.detail.value
    })
  },
  subOther:function(e){
    var str='sub.other'
    this.setData({
      [str]:e.detail.value
    })
  },
  submitDone:function(){
    var that=this;
    var str='sub.id';
    that.setData({
      [str]:that.data.id
    })
    if(that.data.sub.kingdom!=''){
    const db = wx.cloud.database();
    const table=db.collection('discuss');
    table.add({
      data:{
        fight:that.data.sub
      }
    })
    var fight1=that.data.fight
    var fight2={}
    var fight3=that.data.sub
    fight2.fight=fight3
    fight1.push(JSON.parse(JSON.stringify(fight2)))
    that.setData({
      add1:false,
      findDisplay:true,
      fight:fight1
    })
    wx.showModal({
      title: '提示',
      content: '添加成功',
      showCancel: false,
      confirmText: '确定',
      success: function(res) {
        }
      });
    }
  },
  submitNone:function(){
    this.setData({
      add1:false,
      findDisplay:true
    })
  },
  addCreate:function(){
    this.setData({
      add1:true,
      findDisplay:false
    })
  },
  remove:function(e){
    var _id=e.currentTarget.dataset._id;
    var that=this;
    wx.cloud.init();
    const db = wx.cloud.database();
    const table=db.collection('discuss');
    table.doc(_id).remove({
      success:function(res){
        wx.showModal({
          title: '警告',
          content: '删除成功，请重新加载页面!',
          showCancel: false,
          confirmText: '确定',
          success: function(res) {
            if (res.confirm) {
              wx.switchTab({
              url: '/pages/index/index',
            })
            }
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      id:options.id
    })
    wx.cloud.init();
    const db = wx.cloud.database();
    const table=db.collection('discuss');
    table.get({
      success:function(res){
        that.setData({
          fight:res.data
        })
        console.log(that.data.fight);
        
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