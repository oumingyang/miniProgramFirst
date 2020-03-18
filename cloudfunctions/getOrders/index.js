// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  const countResult = await db.collection('t_departmentOrderInformation').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  // 对传入的参数进行判断，是进行部门、处还是个人查询
  if (event.name == "hello"){
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('t_departmentOrderInformation').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        date: event.date,
        department: event.department
      }).get()
      tasks.push(promise)
    }
  }else if(event.name == "hi")
  {
    for (let i = 0; i < batchTimes; i++) {
      const promise = db.collection('t_departmentOrderInformation').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
        date: event.date,
        department: event.department,
        branch: event.branch
      }).get()
      tasks.push(promise)
    }
  }else{
      for (let i = 0; i < batchTimes; i++) {
        const promise = db.collection('t_departmentOrderInformation').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
          date: event.date,
          name: event.name,
          department: event.department,
          branch: event.branch
        }).get()
        tasks.push(promise)
        }
    }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}