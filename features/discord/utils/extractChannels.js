const channelRE = /<#(\d+)>/g

const getChannelsIds = text => {
  const channelsIds = []
  let m
  while (m = channelRE.exec(text))
    channelsIds.push(m[1])
  return channelsIds
}

module.exports = text => ({
  newText: text.replace(channelRE, ''),
  channelsIds: getChannelsIds(text)
})