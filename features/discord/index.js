// import discord.js library
var Discord = require('discord.js');
// initialize the bot
var client = new Discord.Client();
// log something to verify the bot is working
console.log('Initializing the bot');
// log something as soon as the bot is ready
client.on('ready', function () {
  console.log('Beep boop');
});

// do something when the bot receives a message
client.on('message', function (message) {
  // ignore bot messages
  if (message.author.bot)
    return
  
  if (!message.isMentioned(client.user))
    return;
  
  const text = require('../utils/stripMention')(client.user.id)(message.content)
    
  // reply to the message
  message.reply('You said: ' + text);
});
// make the bot log in
client.login(process.env.DISCORD_BOT_TOKEN);