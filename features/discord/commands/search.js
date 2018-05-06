const Discord = require('discord.js')
const tips = require('../../../models/tips')
const tipToEmbed = require('../utils/tipToEmbed')
const emojis = require('../utils/emojis')

/**
 * 
 * @param {Discord.Message} message 
 * @param {string} text 
 * @param {*} server 
 */
async function search(message, text, server) {
    if (!text)
        return message.reply('you have to specify some term to search for:\n```\nsearch <term> <term>\n```')

    /** @type {Array.<Tip>} */
    const searchResult = await getSearchResult(text)
    if (!searchResult)
        return await message.reply(`I found no tip matching *${text}*`)

    const content = `<@${message.author.id}> I found ${searchResult.searchCount} matching *${text}*`
    const reply = await message.channel.send(content, { embed: searchResult })
    addArrows(reply, 0, searchResult.searchCount)

    return reply
}

search.listenForArrowReactions = client => client.on('messageReactionAdd', onReaction.bind(null, client))

module.exports = search

/**
 * 
 * @param {Discord.Message} message 
 * @param {number} index 
 * @param {number} length 
 */
async function addArrows(message, index, length) {
    await message.clearReactions()
    // if (index > 0)
        await message.react(emojis.ARROW_BACKWARD)
    // if (index < length - 1)
        await message.react(emojis.ARROW_FORWARD)
}


async function getSearchResult(text, index = 0) {
    const matchingTips = await tips.search(text)
    const count = matchingTips.length
    const tip = matchingTips[index]
    if (!tip)
        return null

    const embed = tipToEmbed(tip)
    embed.fields = (embed.fields || [])
        .concat([{
            name: 'Result', value: `${index + 1}/${count}`, inline: true
        }, {
            name: 'Query', value: text, inline: true
        }])

    embed.searchCount = count
    return embed
}


/** 
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
async function onReaction(client, reaction, user) {
    // ignore bot interactions
    if (user.bot)
        return

    const { message } = reaction
    // ignore messages not sent by the bot
    if (message.author.id !== client.user.id)
        return
        
    const embed = message.embeds && message.embeds[0]
    if (!embed)
        return

    let direction = 0
    const emojiName = reaction.emoji.name
    if (emojiName === emojis.ARROW_BACKWARD)
        direction = -1
    else if (emojiName === emojis.ARROW_FORWARD)
        direction = 1
    if (!direction)
        return

    const indexField = embed.fields.find(f => f.name === 'Result')
    const queryField = embed.fields.find(f => f.name === 'Query')
    if (!indexField || !queryField)
        return

    reaction.remove(user).catch(err => console.error(err))
    if (!message.isMentioned(user)) {
        return await message.channel.send(`<@${user.id}> make your own search by mentioning me with the command:\n\`\`\`\n@${message.client.user.username} search <terms-to-search>\n\`\`\``)
    }

    const [ index ] = indexField.value.split('/')
    const query = queryField.value
    const nextIndex = (+index - 1) + direction

    if (nextIndex < 0)
        return

    const searchResult = await getSearchResult(query, nextIndex)
    if (!searchResult)
        return

    const content = `<@${user.id}> I found ${searchResult.searchCount} matching *${query}*`
    const reply = await message.edit(content, { embed: searchResult })
    //addArrows(reply, nextIndex, searchResult.searchCount)
}