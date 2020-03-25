// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数，函数先删除再做添加，保持每人、每天只有一条数据
exports.main = async (event, context) => {
  if(event.name == "superUserDelete"){
    try {
      return await db.collection('t_departmentOrderInformation').where({
        date: event.date
      }).remove()
    } catch (e) {
      console.error(e)
    }

  }else{
    try {
      return await db.collection('t_departmentOrderInformation').where({
        date: event.date,
        name: event.name,
        branch: event.branch,
        department: event.department
      }).remove()
    } catch (e) {
      console.error(e)
    }
  }
}