
// 云函数入口文件
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,               // SMTP 端口
  secure: true,            // 使用 SSL
  auth: {
    user: '1628489730@qq.com',   //发邮件邮箱
    pass: 'vtbyjmnoexbqbaij'        //此处是QQ邮箱授权码
  }
});
var mailOptions = {
  from: '1628489730@qq.com',   // 发件地址
  to: ['alanou1992@163.com'],    // 收件列表
  subject: '订餐数据导出，请及时处理',        // 标题
  text: "下载地址将在24小时后失效"
};
var orderDates = {};
var fileID = '';
var downloadLink = '';
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  //获得数据
  await cloud.callFunction({
    // 要调用的云函数名称
    name: 'getDailyOrders',
    // 传递给云函数的event参数
    data: {
      date: event.date
    }
  }).then(res => {
    orderDates = res.result.data

  }).catch(err => {
    return err
  })
  //获得文件存储地址
  await cloud.callFunction({
    name: 'portExcel',
      data: {orderDates}
  }).then(res => {
    fileID = res.result.fileID
  }).catch(err => {
    return err
  })

  await cloud.getTempFileURL({
    fileList: [fileID]
  }).then(res => {
    downloadLink = res.fileList[0].tempFileURL
  }).catch(err => {
    return err
  })
  //开始发送邮
  await mailOptions.to.push(event.mailAddress);
  mailOptions.text = mailOptions.text + ':' + downloadLink;
  const info = await transporter.sendMail(mailOptions);
  mailOptions.text = "下载地址将在24小时后失效";
  mailOptions.to = ["alanou1992@163.com"]
  return info
}