const LoginLog = require('../models/LoginLog')
const https = require('https')

function parseIp(ip) {
  return new Promise((resolve, reject) => {
    let address = ''
    const req = https.request(`https://restapi.amap.com/v3/ip?ip=${ip}&key=5e91b92a1d8714b64202548a8ec4cee0`, res => {
      res.setEncoding('utf-8');
      res.on('data', data => {
        const parseData = JSON.parse(data)
        if (parseData.status == 1) {
          const { province, city, adcode } = parseData // 省  市  邮政编码
          address += Array.isArray(province) ? '' : province
          address += Array.isArray(city) ? '' : city
          resolve(address)
        }
      })
    })
    req.end()
  })
}

exports.saveLoginLog = async (ctx) => {
  const ip = ctx.request.ip
  /* const ip = '115.60.93.195' */
  const address = await parseIp(ip)

  await LoginLog.create({
    ip,
    loginAddress: address
  })
}