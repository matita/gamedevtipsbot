const fs = require('fs')
const path = require('path')
const stripMention = require('./utils/stripMention')

const Discord = require('discord.js');
const client = new Discord.Client();

console.log('Initializing the bot');

// log something as soon as the bot is ready
client.on('ready', function () {
  console.log('Beep boop');
});

const commands = {}

const commandsDir = path.resolve(__dirname, 'commands')
fs.readdir(commandsDir, (err, files) => {
  if (err)
    return console.error('Error while getting Discord bot commands', err)
  
  files
    .filter(f => f.endsWith('.js'))
    .map(f => path.basename(f, '.js'))
    .forEach(f => commands[f] = require(path.resolve(commandsDir, f + '.js')))
})

// do something when the bot receives a message
client.on('message', function (message) {
  // ignore bot messages
  if (message.author.bot)
    return
  
  if (!message.isMentioned(client.user))
    return;
  
  const text = stripMention(client.user.id)(message.content)
    
  // reply to the message
  message.reply('You said: ' + text);
});
// make the bot log in
client.login(process.env.DISCORD_BOT_TOKEN);