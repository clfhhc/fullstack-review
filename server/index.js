const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index');

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  console.log('POST to /repos');
  username = req.body.search;
  if (!req.body.search) {
    res.sendStatus(400);
    return;
  }
  github.getReposByUsername(username).then((records) => {
    db.save(records)
    .then((docs) => {
      console.log('batch insert successfully');
      res.sendStatus(201);
  }).catch(err => {
      console.log('insert database err:', err);
      res.statusCode = 500;
      res.send(err);
  });
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET to /repos');
  db.loadLatestRepos(25)
  .then((repos) => {
    res.statusCode = 200;
    res.send(repos);
  }).catch((err) => {
    console.log('loading database err:', err);
      res.statusCode = 500;
      res.send(err);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

