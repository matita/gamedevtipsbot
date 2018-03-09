const schedule = require('node-schedule')
const serversDb = require('../../models/servers')
const { serverFactory } = require('../../models/server')
const channelsDb = require('../../models/channels')
const { getChannel } = require('../../models/channel')
const randomTip = require('./utils/randomTip')

const sendTips = (client) => {
  console.log('running scheduled job')
  serversDb.find({}, (err, servers) => {
    if (err)
      return console.error(err)
    servers.map(serverFactory)
      .forEach(s => s.sendTips(client))
  })
}

module.exports = client => {
  //const job = schedule.scheduleJob('0 30 7 * * *', sendTips.bind(null, client))
  const job = schedule.scheduleJob('*/10 * * * * *', sendTips.bind(null, client))
  console.log('scheduled job ' + new Date())
}