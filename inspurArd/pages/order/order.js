// pages/order/order.js

var serverTime = require('../../utils/utils.js');

Page({
  
  data: {

    date: "",
    today: "",

    departments: [],
    departmentIndex: 0,

    branches: [],
    branchIndex: 0,

    lunches: [],
    lunchIndex: 0,

    dinners: [],
    dinnerIndex: 0,

    complementaryFood: [],
    complementaryFoodIndex: 0,

    halal: [],
    halalIndex: 0,

    name: "",

    pageShowed: true,
    handupShowed: true,

    submit: "确定", 
    reSubmit: "再提交一份",

    warning: "提交成功"

  },
  onLoad: function(){
    
    //1. 从云端加载数据完成初始化
    //1.1 创建数据库引用
    const db = wx.cloud.database()
    //1.2 获取数据库集合引用
    const menuInformationCollection = db.collection("t_menu")
    
    //1.3 查询菜单数据
    menuInformationCollection.doc('253e38e5-1c36-4b09-ac80-647593db4e9d').get().then(res => {
      this.setData({
        lunches: res.data.menuDate.menu,
        dinners: res.data.menuDate.menu,
        halal: res.data.menuDate.halal,
        complementaryFood: res.data.menuDate.complementaryFood
      })
    }).catch(err => {
      console.log("查询失败", err)
    })
    // 查询部门信息
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getDepartment'
    }).then(res => {
      let index = 0
      let departmentDates = []
      let branchDates = []
      let departmentDate = ""
      let branchDate = []
      for (index in res.result.data){
        departmentDate = res.result.data[index].departmentName
        branchDate = res.result.data[index].branches
        departmentDates.push(departmentDate)
        branchDates.push(branchDate)
      }
      
      this.setData({
        departments: departmentDates,
        branches: branchDates,
      })
      
    }).catch(err => {
      console.log("提交失败", err)
    })
  },
  onShow: function(){
    //刷新获得系统时间
    wx.cloud.callFunction({
      name: 'getServerDate',
    }).then(res=>{
      let nowtime = serverTime.formatTime(serverTime.utc_beijing(res.result.time))
      this.setData({
        date: nowtime,
        today: nowtime
      })
    }).catch(err => {
      console.log("获取系统时间失败", err)
    })
    
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
  bindDepartmentChange: function (e) {
    this.setData({
      departmentIndex: e.detail.value
    })
  },
  bindBranchChange: function (e) {
    this.setData({
      branchIndex: e.detail.value
    })
  },
  bindLunchChange: function (e) {
    this.setData({
      lunchIndex: e.detail.value
    })
  },
  bindDinnerChange: function (e) {
    //console.log('picker dinner 发生选择改变，携带值为', e.detail.value);
    this.setData({
      dinnerIndex: e.detail.value
    })
  },
  bindHalalChange: function (e) {
    this.setData({
      halalIndex: e.detail.value
    })
  },
  submitForm: function () {

    if(this.data.name){
      this.setData({
        submit: "提交中"

      })

      //1."准备数据---------"
      let date = this.data.date.replace(/\//g, '-')
      // 将时间格式标准化
      
      let name = this.data.name
      let departmentIndex = this.data.departmentIndex
      let branchIndex = this.data.branchIndex
      let lunchIndex = this.data.lunchIndex
      let dinnerIndex = this.data.dinnerIndex
      let halalIndex = this.data.halalIndex
      let department = this.data.departments[departmentIndex]
      let branch = this.data.branches[departmentIndex][branchIndex]
      let lunch = this.data.lunches[lunchIndex]
      let dinner = this.data.dinners[dinnerIndex]
      let halal = this.data.halal[halalIndex]
      //2. 将数据存储到云数据库

      wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'removeData',
        // 传递给云函数的event参数
        data: {
          date: date,
          name: name,
          department: department,
          branch: branch
        }
      }).then(res => {
        //添加数据
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'addData',
          // 传递给云函数的event参数
          data: {
            date: date,
            name: name,
            department: department,
            branch: branch,
            lunch: lunch,
            dinner: dinner,
            halal: halal
          }
        }).then(res => {
          this.setData({
            handupShowed: false,
            pageShowed: false

          })
        }).catch(err => {
          console.log("提交失败", err)
        })

      }).catch(err => {
        console.log("提交失败", err)
      })
    }else{
      this.setData({
        submit: "姓名不能为空"

      })

    }

  },
  reSubmitForm: function(){
    this.setData({
      submit: "确定",
      pageShowed: true,
      handupShowed: true
      
    })
  }
   
});