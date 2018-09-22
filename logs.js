//logs.js
const util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    datalists: [
      {id:0,content:"纪意轨迹"},

    ],
    test: true
  },

  add: function () {
    wx.redirectTo({
      url: '../../addacc/addacc',
    })
  },

  onLoad: function () {
    var that = this;
    var num = 0;
    //如果是编辑状态中
    if (app.globalData.isedit == true)
    {
      num = wx.getStorageSync('editnum')
    }
    else{//如果不是编辑状态
      //获取缓存中记录的账目的条数
      num = app.globalData.account;
    }
    
    console.log('number', num)
    //获取datalist 缓存的key值
    var account = String(num)
    //获取本次要添加在后面的账目内容
    var datalist = wx.getStorageSync(account);
    //获取全局变量 addaccount 判断是否需要添加数组元素
    var addaccount = app.globalData.addaccount;
    if (num > 1 || app.globalData.isedit == true)//当不是第一次输入时，获取保存在缓存里的datalists数据
    {
      that.data.datalists = wx.getStorageSync('account')
      console.log('赋值成功！', that.data.datalists)
      that.setData({
        'datalists': that.data.datalists
      })
    }
    
    if(app.globalData.isedit == true)
    {
      var id = parseInt(wx.getStorageSync('editnum')) 
      console.log('被编辑的账目id：',id);
      console.log('编辑内容', datalist.content)
      var changeitem = 'datalists['+id+'].content'
      app.globalData.isedit = false
      //that.data.datalists[id].content = wx.getStorageSync('account');
      that.setData({
        [changeitem]: datalist.content//that.data.datalists
      })
    }

   
   
    if (datalist != '' && addaccount == true) {
      //将需要添加账目置为false
      app.globalData.addaccount = false;
      //添加账目
      that.data.datalists = that.data.datalists.concat(datalist)
      console.log('赋值成功！', that.data.datalists)
      that.setData({
        'datalists': that.data.datalists
      })
      //把更新后的账目表储存到缓存 datalists
      wx.setStorageSync('account',that.data.datalists )
    }
    else {
      console.log('赋值失败！')
    }

  },

  tapevent: function(e) {
    console.log('点击的编号是：',e.currentTarget.dataset.id)
    wx.showModal({
      title: '提醒',
      content: '您是否要进入编辑页面？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.globalData.isedit = true;
          wx.setStorageSync('editnum', e.currentTarget.dataset.id);
          console.log('要编辑的账目编号是：', e.currentTarget.dataset.id);
          wx.redirectTo({
            url: '../../addacc/addacc',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  deltap: function(e) {
    var num = e.currentTarget.dataset.id;
    var that = this;
    console.log('长按的编号是：', e.currentTarget.dataset.id)
    wx.showModal({
      title: '警告',
      content: '您是否要删除本条纪意账目？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.datalists.splice(num,1);
          that.setData({
            datalists: that.data.datalists
          })
          console.log('删除完成', that.data.datalists);
          //把更新后的账目表储存到缓存 datalists
          wx.setStorageSync('account', that.data.datalists)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  onShow: function (){
    
  }
})
