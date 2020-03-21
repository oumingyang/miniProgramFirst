// pages/total/total.js
Page({
  data: {

    serverDate: "",

    departments: [],
    departmentIndex: 0,

    branches: [],
    branchIndex: 0,

    name: "",
    branch: "",
    date: "",
    lunch: "",
    dinner: "",
    halal: "",

    lunchNumber: 0,
    lunchOption: 0,
    lunchRiceNumber: 0,
    lunchSteamedRollNumber: 0,
    lunchHalalNumber: 0,

    dinnerNumber: 0,
    dinnerOption: 0,
    dinnerRiceNumber: 0,
    dinnerSteamedRollNumber: 0,
    dinnerHalalNumber: 0,

    pageShowed: true,
    personalShowed: false,
    departmentShowed: false,
    branchShowed: false,

    submit: "确定",
    reSubmit: "再次查询"

  },

  onLoad: function () {
    //1. 从云端加载数据完成初始化
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
      for (index in res.result.data) {
        departmentDate = res.result.data[index].departmentName
        branchDate = res.result.data[index].branches
        departmentDates.push(departmentDate)
        branchDates.push(branchDate)
      }
      this.setData({
        departments: departmentDates,
        branches: branchDates,
        serverDate: res.result.serverDate
      })

    }).catch(err => {
      console.log("提交失败", err)
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
  formInputChange(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      name: e.detail.value
    })
  },
  submitForm: function () {

    if (this.data.name){
      this.setData({
        submit: "提交中"

      })
      if(this.data.name.search('@')){
        wx.cloud.callFunction({
          name: 'mail',
          data:{
            date: this.data.date,
            mailAddress: this.data.name
          }
        }).then(res => {
          this.setData({
            submit: "邮件已发送"
          })
        }).catch(err => {
          console.log(err)
        })
      }else{

        //1."准备数据---------"
        let date = this.data.date
        let name = this.data.name
        let departmentIndex = this.data.departmentIndex
        let branchIndex = this.data.branchIndex
        let department = this.data.departments[departmentIndex]
        let branch = this.data.branches[departmentIndex][branchIndex]

        let index = 0
        let lunchNumber = 0
        let lunchOption = 0
        let lunchRiceNumber = 0
        let lunchSteamedRollNumber = 0
        let lunchHalalNumber = 0

        let dinnerNumber = 0
        let dinnerOption = 0
        let dinnerRiceNumber = 0
        let dinnerSteamedRollNumber = 0
        let dinnerHalalNumber = 0

        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: 'getOrders',
          // 传递给云函数的event参数
          data: {
            date: date,
            department: department,
            branch: branch,
            name: name
          }
        }).then(res => {
          console.log("订单查询成功", res)
          if (name == "hello" || name == "hi") {
            for (index in res.result.data) {
              switch (res.result.data[index].lunch) {
                case "套餐_米饭1":
                  lunchNumber = lunchNumber + 1;
                  lunchRiceNumber = lunchRiceNumber + 1;
                  if (res.result.data[index].halal == "是") {
                    lunchHalalNumber = lunchHalalNumber + 1
                  }
                  break;
                case "套餐_馒头1":
                  lunchNumber = lunchNumber + 1;
                  lunchSteamedRollNumber = lunchSteamedRollNumber + 1;
                  if (res.result.data[index].halal == "是") {
                    lunchHalalNumber = lunchHalalNumber + 1
                  }
                  break;
                case "套餐_米饭2":
                  lunchNumber = lunchNumber + 1;
                  lunchRiceNumber = lunchRiceNumber + 2;
                  if (res.result.data[index].halal == "是") {
                    lunchHalalNumber = lunchHalalNumber + 1
                  }
                  break;
                case "套餐_馒头2":
                  lunchNumber = lunchNumber + 1;
                  lunchSteamedRollNumber = lunchSteamedRollNumber + 2;
                  if (res.result.data[index].halal == "是") {
                    lunchHalalNumber = lunchHalalNumber + 1
                  }
                  break;
                case "特色餐_无主食":
                  lunchOption = lunchOption + 1;
                  break;
                case "特色餐_米饭1":
                  lunchOption = lunchOption + 1;
                  lunchRiceNumber = lunchRiceNumber + 1;
                  break;
                case "特色餐_米饭2":
                  lunchOption = lunchOption + 1;
                  lunchRiceNumber = lunchRiceNumber + 2;
                  break;
                case "特色餐_馒头1":
                  lunchOption = lunchOption + 1;
                  lunchSteamedRollNumber = lunchSteamedRollNumber + 1;
                  break;
                case "特色餐_馒头2":
                  lunchOption = lunchOption + 1;
                  lunchSteamedRollNumber = lunchSteamedRollNumber + 2;
                  break;
              }
              switch (res.result.data[index].dinner) {
                case "套餐_米饭1":
                  dinnerNumber = dinnerNumber + 1;
                  dinnerRiceNumber = dinnerRiceNumber + 1;
                  if (res.result.data[index].halal == "是") {
                    dinnerHalalNumber = dinnerHalalNumber + 1
                  }
                  break;
                case "套餐_馒头1":
                  dinnerNumber = dinnerNumber + 1;
                  dinnerSteamedRollNumber = dinnerSteamedRollNumber + 1;
                  if (res.result.data[index].halal == "是") {
                    dinnerHalalNumber = dinnerHalalNumber + 1
                  }
                  break;
                case "套餐_米饭2":
                  dinnerNumber = dinnerNumber + 1;
                  dinnerRiceNumber = dinnerRiceNumber + 2;
                  if (res.result.data[index].halal == "是") {
                    dinnerHalalNumber = dinnerHalalNumber + 1
                  }
                  break;
                case "套餐_馒头2":
                  dinnerNumber = dinnerNumber + 1;
                  dinnerSteamedRollNumber = dinnerSteamedRollNumber + 2;
                  if (res.result.data[index].halal == "是") {
                    dinnerHalalNumber = dinnerHalalNumber + 1
                  }
                  break;
                case "特色餐_无主食":
                  dinnerOption = dinnerOption + 1;
                  break;
                case "特色餐_米饭1":
                  dinnerOption = dinnerOption + 1;
                  dinnerRiceNumber = dinnerRiceNumber + 1;
                  break;
                case "特色餐_米饭2":
                  dinnerOption = dinnerOption + 1;
                  dinnerRiceNumber = dinnerRiceNumber + 2;
                  break;
                case "特色餐_馒头1":
                  dinnerOption = dinnerOption + 1;
                  dinnerSteamedRollNumber = dinnerSteamedRollNumber + 1;
                  break;
                case "特色餐_馒头2":
                  dinnerOption = dinnerOption + 1;
                  dinnerSteamedRollNumber = dinnerSteamedRollNumber + 2;
                  break;
              }

            }
            if (name == "hello") {
              this.setData({
                pageShowed: false,
                departmentShowed: true,
                branchShowed: false,
                personalShowed: false
              })
            } else {
              this.setData({
                pageShowed: false,
                departmentShowed: true,
                branchShowed: true,
                personalShowed: false,

              })
            }
            this.setData({

              date: date,
              department: department,
              branch: branch,

              lunchNumber: lunchNumber,
              lunchRiceNumber: lunchRiceNumber,
              lunchSteamedRollNumber: lunchSteamedRollNumber,
              lunchOption: lunchOption,

              dinnerNumber: dinnerNumber,
              dinnerRiceNumber: dinnerRiceNumber,
              dinnerSteamedRollNumber: dinnerSteamedRollNumber,
              dinnerOption: dinnerOption

            })

          } else {
            this.setData({
              pageShowed: false,
              personalShowed: true,
              departmentShowed: false,
              branchShowed: false,

              name: res.result.data[0].name,
              date: res.result.data[0].date,
              department: res.result.data[0].department,
              branch: res.result.data[0].branch,
              lunch: res.result.data[0].lunch,
              dinner: res.result.data[0].dinner,
              halal: res.result.data[0].halal

            })
          }

        }).catch(err => {
          console.log("提交失败", err)
        })
        
      }

    }else{
      this.setData({
        submit:"姓名不能为空"
      })
    }
  },
  reSubmitForm: function () {
    this.setData({
      submit: "确定",
      pageShowed: true,
      personalShowed: false,
      departmentShowed: false,
      branchShowed: false,

    })
  }

});