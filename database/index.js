const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

mongoose.Promise = global.Promise;
mongoose.connection.once('open', (err) => {
  if (err) console.log('what is that: ', err);
  console.log('mongo connection is up');
}).on('close', (err) => {
  if (err) console.log('mongoose connection close was not successful: ', err);
  console.log('mongoose connection is closed')
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  ownerId: Number,
  ownerName: String,
  ownerHtmlUrl: String,
  repoId: {type: Number, required: true, unique: true},
  repoName: String,
  repoHtmlUrl: String,
  updatedAt: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return new Promise((resolve, reject) => {
    Repo.insertMany(data, {ordered: false}, (err, docs) => {
      if (err && err.code !== 11000) reject(err);
      resolve(docs);
    }).catch((err) => {
      console.log('Database insert error', err.code, ':', err.message);
      if (err.code === 11000) resolve();
    })
  })
  
}

let loadLatestRepos = (limit) => {
  return new Promise((resolve, reject) => {
    Repo.find()
    .limit(limit)
    .sort('-updatedAt')
    .select('ownerName ownerHtmlUrl repoName repoId repoHtmlUrl')
    .exec((err, records) => {
      if (err) reject(err);
      resolve(records);
    }).catch(err => console.log('what the loading error is:', err))
  })
  
}

module.exports = {
  save: save,
  loadLatestRepos: loadLatestRepos
};
