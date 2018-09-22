// addacc/addacc.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    thing: '',
    money: '',
    datalist: '',
    notinput: false
  },

  bindDateChange: function(e) {
    var that = this;
    var date = that.data.date;
    console.log('picker发送改变，携带值为', e.detail.value)
    date = e.detail.value
    that.setData({
      date: e.detail.value
    })
  },
  //当事项栏失去焦点，将input组件的内容储存到thing变量中
  okthing: function(e) {
    var thing = e.detail.value
    console.log('thing',thing)
    var that = this

      that.data.notinput = true
      that.setData({
        notinput: true
      })

      that.data.thing = thing
     
    },
  
  //当金额栏失去焦点，将input组件的内容储存到money变量中
  okmoney: function (e) {
    var money = e.detail.value
    console.log('money', money)
    var that = this

    that.setData({
      money: money
    })
    that.data.money = money
  },
//当用户按下完成键
  okbtn: function (e) {
    var that = this;
    var thing = that.data.thing
    var money = that.data.money
    var date = that.data.date
    //首先判断是否三项都已填
    if (thing =='' || money =='' || date =='') {
      wx.showToast({
        title: '请填入所有事项！',
        icon: 'loading',
        duration: 2000
      })

    }
    else {
      var isedit = app.globalData.isedit;
      var num = 0
      if(isedit == true)//如果是编辑现有
      {
        //读取在缓存中寄存的需要修改的事项的id
        num = wx.getStorageSync('editnum');
      }
      else//如果是新增账目
      {
        //正在新增账目
        app.globalData.addaccount = true
        //用户账目数+1
        app.globalData.account = app.globalData.account + 1
        //将用户账目数储存到缓存，key为'accountnum'
        wx.setStorageSync('accountnum', app.globalData.account)

        num = app.globalData.account;
      }
      console.log('number', num)
      var account = String(num)
      //将单个账目信息储存到缓存，key为账目数
      wx.setStorageSync(account, {id:num,content:date + '\t 事项：' + thing + '\t 金额：' + money})
      console.log({ id: num, content: date + '\t 事项：' + thing + '\t 金额：' + money })
      //读取本地缓存key信息，debug用
      try {
        var res = wx.getStorageInfoSync()
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      } catch (e) {
        // Do something when catch error
      }
      //储存完毕后跳转至主页
      wx.showToast({
        title: '纪意账目完成！',
      })
      setTimeout(function () {
        wx.switchTab({
          url: './../pages/index/index',
        })
      }, 1000);
      
    }
  },
  //当用户点击退出按钮后，跳转至主页
  cancelbtn: function(e) {
    wx.switchTab({
      url: './../pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})