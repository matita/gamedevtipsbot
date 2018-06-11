const Discord = require('discord.js')
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

/** @param {Discord.Client} client */
const sendJoinSteamGroup = (client) => {
  const channelId = process.env.GENERAL_CHAT
  /** @type {Discord.TextChannel} */
  const channel = client.channels.get(channelId)
  if (!channel)
    return console.log('could not find channel')
  channel.send('Remember to join our Steam gaming group. Here we organise gaming tournaments and events\nhttps://steamcommunity.com/groups/CGDTGG')
}

module.exports = client => {
  const job = schedule.scheduleJob('0 30 19 * * *', sendTips.bind(null, client))
  //const job = schedule.scheduleJob('*/10 * * * * *', sendTips.bind(null, client))
  const sendSteamGroupJob = schedule.scheduleJob('0 0 16 * * *', sendJoinSteamGroup.bind(null, client))
  //const sendSteamGroupJob = schedule.scheduleJob('*/10 * * * * *', sendJoinSteamGroup.bind(null, client))
  console.log('scheduled job ' + new Date())
}