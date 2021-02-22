// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayList:[],
    list:[],
    i:0,
    scrollbar:true,
    displayTimer:0,
    ratioH:0,
    ratioW:0,
    arr:[],
    datas:[],//每个建筑的独有数据
    mapData:{},//地图数据
    mask:false//蒙版显示
  },
  getPosition(item){
    return {
      name:item.name,
      h:item.h*this.data.ratioH-60,
      h:item.w*this.data.ratioW-50
    }
  },
  //加载图片
  imgLoad(){
    const query = wx.createSelectorQuery().in(this);
    query.select('.bgImg').fields({size:true},res=>{
      //原始尺寸
      const width=3223;
      const height=1080;
      if(res){
        //获取当前尺寸
        const nowH =res.height;
        const nowW =res.width;
        //根据原始尺寸计算比例
        this.setData({
          ratioH:nowH/height,
          ratioW:nowW/width
        })
      }
    }).exec();
  },
  //取消蒙版
  cancelMask(){
    this.setData({
      mask:false
    })
  },
  //弹出蒙版，返回标题
  isMask(data){
    const datas = this.data.mapData[data.detail];
    this.setData({
      mask:true,
      mapItem:datas
    })
  },
  //跳转子页面
  turnItem(e){
    const id=e.currentTarget.dataset.key;
    let value=this.data.mapItem[id];
    value=JSON.stringify(value);
    wx.navigateTo({
      url: '/pages/mapItem/mapItem?id='+id+'&value='+value,
    })
  },
  playData(){
    console.log('begin')
    var data = this.data;
    var list = this.data.list;
    // setInterval(()=>{
      
    //   // list.push(displayList[this.data.i])
    //   this.setData({
    //     list:list
    //   })
    // })
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
          displayList:res.data.display,
          arr:res.data.mapList
        })
        // that.playData();
      }
    })
    const map = db.collection('map');
      map.get({
        success:function(res){
        that.setData({
          mapData:res.data[0]
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