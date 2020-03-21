// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.orderDates)
  //添加数据
  //将数据写入Excel，存入远端
  try {
    //1,定义excel表格名
    let dataCVS = "订餐明细" + ".xlsx";
    //2,定义存储数据的
    let alldata = [];
    let row = ['日期', '姓名', '一级部门', '二级部门', '午餐', '晚餐', '清真']; //表属性
    alldata.push(row);

    for (key in event.orderDates) {
      let arr = [];
      arr.push(event.orderDates[key].date);
      arr.push(event.orderDates[key].name);
      arr.push(event.orderDates[key].department);
      arr.push(event.orderDates[key].branch);
      arr.push(event.orderDates[key].lunch);
      arr.push(event.orderDates[key].dinner);
      arr.push(event.orderDates[key].halal);
      alldata.push(arr)
    }
    //3，把数据保存到excel里
    var buffer = await xlsx.build([{
      name: "订餐信息",
      data: alldata
    }]);

    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: dataCVS,
      fileContent: buffer, //excel二进制文件
    })
  } catch (err) {
    return err
  }

}