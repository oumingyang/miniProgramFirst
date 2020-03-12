// pages/order/index.js
Page({
  
  data: {

    date: "2020-03-01",

    branches: ["研发一处", "研发二处", "研发三处", "研发四处", "研发五处", "部门总"],
    branchIndex: 0,

    lunches: ["无", "套餐 + 1份米饭", "套餐 + 2份米饭", "焖面"],
    lunchIndex: 0,

    dinners: ["无", "套餐 + 1份米饭", "套餐 + 2份米饭", "焖面"],
    dinnerIndex: 0,

    halal: ["否", "是"],
    halalIndex: 0,

    name: "张三",

    pageShowed: true,
    handupShowed: true,

    submit: "确定", 
    reSubmit: "再提交一份",

    warning: "提交成功"

  },

  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      name: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindBranchChange: function (e) {
    console.log('picker branch 发生选择改变，携带值为', e.detail.value);

    this.setData({
      branchIndex: e.detail.value
    })
  },
  bindLunchChange: function (e) {
    console.log('picker lunch 发生选择改变，携带值为', e.detail.value);

    this.setData({
      lunchIndex: e.detail.value
    })
  },
  bindDinnerChange: function (e) {
    console.log('picker dinner 发生选择改变，携带值为', e.detail.value);

    this.setData({
      dinnerIndex: e.detail.value
    })
  },
  bindHalalChange: function (e) {
    console.log('picker halal 发生选择改变，携带值为', e.detail.value);
    this.setData({
      halalIndex: e.detail.value
    })
  },
  submitForm: function () {

    this.setData({
      submit: "提交中"

    })

    //1."准备数据---------"
    let date = this.data.date
    let name = this.data.name
    let branchIndex = this.data.branchIndex
    let lunchIndex = this.data.lunchIndex
    let dinnerIndex = this.data.dinnerIndex
    let halalIndex = this.data.halalIndex
    let branch = this.data.branches[branchIndex]
    let lunch = this.data.lunches[lunchIndex]
    let dinner = this.data.dinners[dinnerIndex]
    let halal = this.data.halal[halalIndex]
    //2. 将数据存储到云数据库
    //2.1 创建数据库引用
    const db = wx.cloud.database()
    //2.2 获取数据库集合引用
    const orderInformationCollection = db.collection("t_departmentOrderInformation")
    //2.3 通过集合往集合内部添加数据
    orderInformationCollection.add({
      data: {
        date: date,
        name: name,
        branch: branch,
        lunch: lunch,
        dinner: dinner,
        halal: halal
      }
    }).then(res => {
      console.log("提交成功", res)
      this.setData({
        handupShowed: false,
        pageShowed: false
        
      })
    }).catch(err => {
      console.log("提交失败", err)
    })

  },
  reSubmitForm: function(){
    this.setData({
      submit: "确定",
      pageShowed: true,
      handupShowed: true
      
    })
  }
   
});