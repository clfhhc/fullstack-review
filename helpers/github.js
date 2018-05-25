const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `/users/${userName}/repos`,
    baseUrl: 'https://api.github.com/',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    },
    qs: {
      type: 'all',
      sort: 'updated',
      direction: 'desc',
    }
  };
  
  return new Promise(function(resolve, reject){
    request(options, function(err, res, body) {
      // console.log('resp: ', res);
      // console.log("typeof res = ", typeof res);
      // console.log("typeof body = ", typeof body)
      // console.log('keys of res = ', Object.keys(res) )
      // console.log(res.body === body);
      if (err) reject(err)
      resolve(JSON.parse(body));
    })
  }).then((data) => {
    return Promise.resolve(Object.entries(data).map(([key, value]) => {
      record = {
        ownerId: value.owner.id,
        ownerName: value.owner.login,
        ownerHtmlUrl: value.owner["html_url"],
        repoId: value.id,
        repoName: value.name,
        repoHtmlUrl: value["html_url"],
        updatedAt: new Date(value['updated_at'])
      }
      return record;
    }));
  })
  

}

module.exports.getReposByUsername = getReposByUsername;