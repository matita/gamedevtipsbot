const Discord = require('discord.js')
const serversDb = require('./servers')
const channelsDb = require('./channels')
const { getChannel, channelFactory } = require('./channel')
const randomTip = require('../features/discord/utils/randomTip')

const serverFactory = server => ({
  ...server,
  
  setDefaultChannel: (channelId) => {
    server.defaultChannelId = channelId
    return new Promise((resolve, reject) => {
      serversDb.update({ _id: server._id }, server, (err, numUpdated) => {
        if (err)
          return reject(err)
        if (!numUpdated)
          return reject(`No server updated with id ${server._id}`)
        resolve(serverFactory(server))
      })
    })
  },
    
  getChannel: (channelId) => getChannel({ serverId: server._id, channelId }),
    
  allChannels: () => new Promise((resolve, reject) => {
    console.log('serverId', server._id)
    channelsDb.find({ serverId: server._id }).exec((err, channels) => {
      if (err) reject(err)
      else resolve(channels.map(channelFactory))
    })
  }),
    
  removeChannels: channelsIds => new Promise((resolve, reject) => {
    channelsDb.remove({ _id: { $in: channelsIds } }, { multi: true }, (err, numRemoved) => {
      if (err) reject(err)
      else resolve(numRemoved)
    })
  }),
    
  /** @param {Discord.Client} client */
  sendTips: (client) => new Promise((resolve, reject) => {
    channelsDb
      .find({ serverId: server._id, autotip: true })
      .exec((err, channels) => {
        if (err)
          return reject(err)

        console.log('found channels for server', server._id, channels.length)

        channels
          .map(channelFactory)
          .forEach(channel => {
            /** @type {Discord.TextChannel} */
            const discordChannel = client.channels.get(channel._id)
            console.log('channel for tips:', discordChannel && discordChannel.name)
            if (!channel || !discordChannel)
              return

            randomTip({ channel, discordChannel })
          })
      
      resolve()
      })
  })
  
})

const getServer = (guildId) => new Promise((resolve, reject) => {
  serversDb.findOne({ _id: ''+guildId }).exec((err, s) => {
    if (err) 
      reject(err)
    else if (s)
      resolve(serverFactory(s))
    else
      serversDb.insert({ _id: guildId }, (err, s) => {
        if (err) reject(err)
        else resolve(serverFactory(s))
      })
  })
})

module.exports = {
  getServer,
  serverFactory
}