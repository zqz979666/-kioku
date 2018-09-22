var app = getApp()
var util = require('../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    confirm: false,
    textareaVal: '',  
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = util.formatTime(new Date());
    var content = ''
    date = wx.getStorageSync('date');
    that.setData({
      date: date
    });
    that.data.date = date;
    content = wx.getStorageSync(date);
    that.setData({
      textareaVal: content
    })
    that.data.textareaVal = content;
  },

  isfouce: function () {
    this.setData({
      hiddenmodalput: false
    })
  },

  inputcomplete: function(){
    var that = this
    that.setData({
      confirm: true,
      disable: true 
    })
    that.data.confirm = true;
    that.data.disable = true
  },

  textarea: function (e) {
    var that = this
    var textareaVal = e.detail.value 
    if ( e.detail.value != undefined) {
      that.setData({
        textareaVal: e.detail.value
      })
      console.log('fuck', that.data.date)
      console.log('fuck', textareaVal)
    }
    else {
      that.setData({
        textareaVal: '录入日记失败！'   
      });
    }
    this.data.textareaVal = textareaVal

  },

  cancelbtn: function () {
    wx.switchTab({
      url: './../pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  okbtn: function (e) {
    var self = this;
    var textareaVal = self.data.textareaVal
    console.log('日记内容',textareaVal)
      wx.setStorageSync(self.data.date, textareaVal)
    try {
      var res = wx.getStorageInfoSync()
      console.log(res.keys)
      console.log(res.currentSize)
      console.log(res.limitSize)
    } catch (e) {
      // Do something when catch error
    }
    wx.showToast({
      title: '纪意日记完成！',
    })
    setTimeout(function(){
      wx.switchTab({
        url: './../pages/index/index',
      })

    },1000);
    
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