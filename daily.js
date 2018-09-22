// daily/daily.js
var app = getApp()
var util = require('../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    diarytype: 0,
    diary: "",

  },

  adddiary: function(){
    wx.redirectTo({
      url: './../add/add',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindDateChange: function(e) {
    var that = this;
    var date = that.data.date;
    console.log('picker发送改变，携带值为', e.detail.value)
    date= e.detail.value
    app.globalData.changedate = true
    that.setData({
      date: e.detail.value
    })
    that.data.date = e.detail.value;
    wx.setStorageSync('date', date);
    
  },

  changedate: function(e) {
    wx.redirectTo({
      url: './../add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, 
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.changedate == false)
    {
      var date = util.formatTime(new Date());
      wx.setStorage({
        key: 'date',
        data: date,
      })
      var self = this;
      var diarytype = 0;
      self.setData({
        date: date
      });
    }
    else{
      var date = '';
      var self = this;
      var diarytype = 0;
      date = wx.getStorageSync('date');
      self.setData({
        date: date
      });
      self.data.date = date;
    }
    wx.getStorage({
      key: self.data.date,
      success: function(res) {
        console.log('fuck', self.data.date)
        self.setData({
          diarytype: 1,
          diary: res.data
        })
        self.data.diarytype = diarytype;
      },
      fail: function(){
        console.log('fuck',666)
      }
    })

    },

    
  updatediary: function(e) {
    wx.redirectTo({
      url: './../add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  deldiary: function(e) {
    var that = this;
    var date = that.data.date;
    console.log('shit',date)
    wx.showModal({
      title: '警告',
      content: '您即将忘却今天的纪意！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorageSync(date)
          app.globalData.isdel = true
          wx.switchTab({
            url: './../pages/index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    var that = this;
    if(app.globalData.isdel == true)
    {
      that.data.diarytype = 0;
      that.setData({
        diarytype: 0
      })
    }
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