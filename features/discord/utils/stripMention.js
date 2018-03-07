module.exports = userId => text => 
  text.replace(`<@${userId}>`, '')