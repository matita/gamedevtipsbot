const axios = require('axios')

// https://www.patreon.com/api/stream?include=attachments%2Cuser_defined_tags&fields[post]=content%2Cembed%2Cimage%2Cpost_file%2Cpublished_at%2Cpatreon_url%2Cpost_type%2Cpledge_url%2Cthumbnail_url%2Ctitle%2Curl&fields[user]=image_url%2Cfull_name%2Curl&fields[post]=%2Ccontent%2Cembed%2Cimage%2Cpost_file%2Cpublished_at%2Cpatreon_url%2Cpost_type%2Cpledge_url%2Cthumbnail_url%2Ctitle%2Curl&fields[user]=image_url%2Cfull_name%2Curl&fields[campaign]=earnings_visibility&page[cursor]=2017-07-25T13%3A00%3A00Z&filter[is_by_creator]=true&filter[is_following]=false&filter[creator_id]=2279992&filter[user_defined_tags]=tutorial&filter[contains_exclusive_posts]=true&json-api-use-default-includes=false&json-api-version=1.0

const baseUrl = 'https://www.patreon.com/api/stream'
const defaultParams = {
  include: 'attachments,user_defined_tags',
  'fields[post]': 'content,embed,image,post_file,published_at,patreon_url,post_type,pledge_url,thumbnail_url,title,url',
  'fields[user]': 'image_url,full_name,url',
  'fields[campaign]': 'earnings_visibility',
  'filter[is_by_creator]': true,
  'filter[is_following]': false,
  'json-api-use-default-includes': false,
  'json-api-version': '1.0',
  
  'filter[creator_id]': '2279992',
  'filter[user_defined_tags]': 'tutorial',
  'filter[contains_exclusive_posts]': true,
  'page[cursor]': '2017-07-25T13%3A00%3A00Z',
}


const parsePostsResponse = res => ({
  data: res.data,
  first: () => axios.get(res.data.links.first).then(parsePostsResponse),
  next: () => axios.get(res.data.links.first).then(parsePostsResponse)
})

const getPosts = params =>
  axios.get(baseUrl, { params: { ...defaultParams, ...params } })
    .then(parsePostsResponse)


module.exports = {
  getPosts
}