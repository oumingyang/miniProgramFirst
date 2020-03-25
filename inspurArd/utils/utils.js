//utc时间转北京时间

function utc_beijing(utc_datetime) {

  // 处理成为时间戳
  var timestamp = utc_datetime / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  //var timestamp = timestamp + 8 * 60 * 60;
  //增加24个小时
  timestamp = timestamp + 24 * 60 * 60;
  // 时间戳转为时间
  //var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
  var beijing_datetime = new Date(parseInt(timestamp) * 1000)
  return beijing_datetime; // 2017-03-31 16:02:06
}

function formatDate(dateTime) {
  var year = dateTime.getFullYear()
  var month = dateTime.getMonth() + 1
  var day = dateTime.getDate()


  //console.log("year 是：", year, month, day)
  return [year, month, day].map(formatNumber).join('-')
}

function formatTime(dateTime) {

  var hour = dateTime.getHours()
  var minute = dateTime.getMinutes()
  var second = dateTime.getSeconds()

  //console.log("year 是：", year, month, day)
  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function closeServer(dateTime) {
  //console.log("Now timeStamp is:", dateTime)
  var hour = dateTime.getHours()
  var minute = dateTime.getMinutes()
  var second = dateTime.getSeconds()

  var nowTime = hour * 60 * 60 + minute * 60 + second
  var deadLine = 17 * 60 * 60
  if(nowTime > deadLine){
    return true
  }else{
    return false
  }

}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  utc_beijing: utc_beijing,
  closeServer: closeServer
}