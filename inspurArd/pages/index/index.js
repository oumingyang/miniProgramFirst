//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    mondayLunch: [],
    mondayDinner: [],
    mondayOption: "",
    tuesdayLunch: [],
    tuesdaydayDinner: [],
    tuesdayOption: "",
  
    wednesdayLunch: [],
    wednesdayDinner: [],
    wednesdayOption: "",
  
    thursdayLunch: [],
    thursdayDinner: [],
    thursdayOption: "",
 
    fridayLunch: [],
    fridayDinner: [],
    fridayOption: ""

  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //1.1 创建数据库引用
    const db = wx.cloud.database()
    //1.2 获取数据库集合引用
    const menuInformationCollection = db.collection("t_menuDetail")

    //1.3 查询菜单数据
    menuInformationCollection.get().then(res => {
      console.log("查询成功", res)
      this.setData({
        mondayLunch: res.data[0].Monday.slice(0, 3),
        mondayDinner: res.data[0].Monday.slice(4, 7),
        mondayOption: res.data[0].Monday[8],

        tuesdayLunch: res.data[0].Tuesday.slice(0, 3),
        tuesdaydayDinner: res.data[0].Tuesday.slice(4, 7),
        tuesdayOption: res.data[0].Tuesday[8],

        wednesdayLunch: res.data[0].Wednesday.slice(0, 3),
        wednesdayDinner: res.data[0].Wednesday.slice(4, 7),
        wednesdayOption: res.data[0].Wednesday[8],

        thursdayLunch: res.data[0].Thursday.slice(0, 3),
        thursdayDinner: res.data[0].Thursday.slice(4, 7),
        thursdayOption: res.data[0].Thursday[8],

        fridayLunch: res.data[0].Friday.slice(0, 3),
        fridayDinner: res.data[0].Friday.slice(4, 7),
        fridayOption: res.data[0].Friday[8]
      })
    }).catch(err => {
      console.log("查询失败", err)
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
