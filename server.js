const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;


app.get('/api/clusters', (req, res) => {
  const filter = {};

  db.collection('clusters').find(filter).sort({ mean_dist: 1 }).toArray().then(clusters => {
    const metadata = { total_count: clusters.length };
    res.json({ _metadata: metadata, records: clusters })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/articles', (req, res) => {
  const filter = {};
  if (req.query.cluster) filter.cluster = req.query.cluster;
  if (req.query.source) filter.source = req.query.source;

  db.collection('articles').find(filter).sort({ dist: 1 }).toArray().then(articles => {
    const metadata = { total_count: articles.length };
    res.json({ _metadata: metadata, records: articles })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/sources', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  db.collection('sources').find(filter).toArray().then(sources => {
    const metadata = { total_count: sources.length };
    res.json({ _metadata: metadata, records: sources })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


let db;
MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
  db = connection.db('notizie');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});
