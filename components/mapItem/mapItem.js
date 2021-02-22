// pages/mapItem/mapItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position:{
      type:Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    name:'',
    innerPosition:{
      name:'',
      h:10,
      w:10
    }
  },
  observers:{
    position:function(position){
      this.setData({
        innerPosition:position
      })
    }
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTouch(){
      this.triggerEvent('isMask',this.data.innerPosition.name);
    },
  }
})
