// 云函数入口文件
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数，函数先删除再做添加，保持每人、每天只有一条数据
exports.main = async (event, context) => {
  try {
    return await db.collection('t_departmentOrderInformation').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        date: event.date,
        name: event.name,
        department: event.department,
        branch: event.branch,
        lunch: event.lunch,
        dinner: event.dinner,
        halal: event.halal

      }
    })
  } catch (e) {
    console.error(e)
  }
}