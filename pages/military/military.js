// pages/military/military.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameKing:{},
    width:0,
    height:0,
    picAttr:{},
    path:'',
    images:'',
    ratio:1
  },
  commit(){
    let that =this;
    // 获取图片信息
    wx.getImageInfo({
      src:this.data.gameKing.youxiwang.border.master.gray,
      success: (res) => { 
        console.log('获取图片信息成功',res);
        that.setData({
          width:res.width,
          height:res.height
        })
        console.log('保存图片信息成功',that.data)
        //下载图片到本地
        that.downloadPic(that);
       },
      fail: (err)=>{
        console.log('背景图片获取失败');
       }
   })
    //获取设备信息屏幕比例
    that.getRatio(that)
  },
  //下载图片
  downloadPic(that){
    //网络图片路径
    let path =that.data.gameKing.youxiwang.border.master.gray;
    //下载图片到本地
    wx.downloadFile({
      url: path,
        success: function (res) {
          that.setData({
            images: res.tempFilePath,
          })
          console.log('下载后的图片路径',that.data.images);
          //获取设备信息屏幕比例
          that.getRatio(that);
       }
    })
  },
  //获取设备信息屏幕比例
  getRatio(that){
    wx.getSystemInfo({
      success: (result) => {
        let screenWidth = result.screenWidth;
        that.setData({
          ratio:screenWidth/750
        })
        console.log('由设备得到尺寸比例',that.data.ratio);
        //绘制图片
        that.drawPic(that)
      },
    })
  },
  //绘制图片
  drawPic(that){
    const ctx = wx.createCanvasContext('myCanvas');
    let images=that.data.images;//下载后图片地址
    console.log('开始绘制，下载后图片地址images',images);
    const ratio =that.data.ratio;
    const width = that.data.width*ratio;
    const height = that.data.height*ratio;
    console.log('比例',ratio);
    ctx.drawImage(images, 0, 0, width, height);
    ctx.draw(false,function(){
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,//指定的画布区域的宽度	
        height: height,//指定的画布区域的高度	
        destWidth: width,//输出的图片的宽度	
        destHeight: height,//输出的图片的高度	
        canvasId: 'myCanvas',
        success(res) {
          console.log('绘制成功,生成文件的临时路径',res.tempFilePath);
          that.setData({
            path:res.tempFilePath//生成文件的临时路径 (本地路径)
          })
        },
        fail(res){
          console.log('失败',res)
        }
      })
    })
    ctx.save()
  },
  // 保存图片
  savePic(){
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.path,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.init();
    const db = wx.cloud.database({});
    const table=db.collection('picture');
    table.doc('picturesWithOthers').get({
      success:function(res){
        that.setData({
          gameKing:res.data
        })
      }
    })
    console.log(this.data)
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