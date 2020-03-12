// pages/total/index.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    name: "",
    branch: "",
    date: "",
    lunch: "",
    dinner: "",
    halal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  handleSubmit: function () {
    //console.log(evt)

    //1. 获取数据
    let inputValue = this.data.inputVal

    //2. 将数据存储到云数据库中
    //2.1 获取数据库引用
    const db = wx.cloud.database()
    //2.2 获取集合引用
    const orderInformationCollection = db.collection("t_departmentOrderInformation")
    //2.3 通过集合往集合内部添加数据
    orderInformationCollection.where({
        name: inputValue
    }).get().then(res => {
        console.log("查询成功", res)
        let indexLatest = res.data.length - 1
        this.setData({
          name: res.data[indexLatest].name,
          branch: res.data[indexLatest].branch,
          date: res.data[indexLatest].date,
          lunch: res.data[indexLatest].lunch,
          dinner: res.data[indexLatest].dinner,
          halal: res.data[indexLatest].halal
        })
    }).catch(err => {
        console.log("查询失败", err)
    })

  }
});