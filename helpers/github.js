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
  })
  

}

module.exports.getReposByUsername = getReposByUsername;