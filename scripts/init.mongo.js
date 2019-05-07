db = new Mongo().getDB('notizie');

db.clusters.remove({});
db.clusters.insert([
  {
    "type": "current",
    "algo": 0,
    "title": "wrote, reporters, chiefs, federal, law, accusing, justice, worked, posted, announced"
  }
]);
// db.clusters.createIndex({ id: 1 });


db.sources.remove({});
db.sources.insert([
  {
    'abbr': 'reuters',
    'full_name': 'Reuters',
    'home_url': 'https://www.reuters.com/politics/',
    'politics_rss_url': 'http://feeds.reuters.com/Reuters/PoliticsNews',
    'bias': 0,
    'type': 62
  },
  {
    'abbr': 'economist',
    'full_name': 'The Economist',
    'home_url': '',
    'politics_rss_url': 'https://www.economist.com/united-states/rss.xml',
    'bias': 4,
    'type': 48
  },
  {
    'abbr': 'NPR',
    'full_name': 'National Public Radio',
    'home_url': '',
    'politics_rss_url': 'https://www.npr.org/rss/rss.php?id=1001',
    'bias': -5,
    'type': 56
  },
  {
    'abbr': 'CBS',
    'full_name': 'Columbia Broadcasting System',
    'home_url': '',
    'politics_rss_url': 'https://www.cbsnews.com/latest/rss/politics',
    'bias': 4,
    'type': 57
  },
  {
    'abbr': 'politico',
    'full_name': 'Politico',
    'home_url': '',
    'politics_rss_url': 'https://www.politico.com/rss/politics08.xml',
    'bias': -3,
    'type': 55
  },
  {
    'abbr': 'LAT',
    'full_name': 'Los Angeles Times',
    'home_url': '',
    'politics_rss_url': 'https://www.latimes.com/nation/politics/rss2.0.xml',
    'bias': -6,
    'type': 58
  },
  {
    'abbr': 'PBS',
    'full_name': 'Public Broadcasting Service',
    'home_url': '',
    'politics_rss_url': 'https://www.pbs.org/newshour/feeds/rss/politics',
    'bias': -5,
    'type': 57
  },
  {
    'abbr': 'hill',
    'full_name': 'The Hill',
    'home_url': '',
    'politics_rss_url': 'https://thehill.com/rss/syndicator/19109',
    'bias': 9,
    'type': 54
  },
  {
    'abbr': 'BBC',
    'full_name': 'British Broadcasting Corporation',
    'home_url': '',
    'politics_rss_url': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml?edition=int',
    'bias': 4,
    'type': 48
  },
  {
    'abbr': 'WAPO',
    'full_name': 'Washington Post',
    'home_url': 'https://www.washingtonpost.com/politics/',
    'politics_rss_url': 'http://feeds.washingtonpost.com/rss/politics',
    'bias': -10,
    'type': 51
  },
]);


db.articles.remove({});
db.articles.insert([
  {
    "cluster": "163",
    "title": "Chief Justice Roberts announces sexual harassment actions",
    "source": 1,
    "authors": "Bob Smith",
    "url": "http://rss.cnn.com/~r/rss/cnn_allpolitics/~3/l1DLoABqf0k/index.html",
    "top_image": "http://cdn.cnn.com/cnnnext/dam/assets/170628161305-chief-justice-roberts-file-01-super-tease.jpg",
    "summary": "(CNN) Supreme Court Chief Justice John Roberts announced in an annual report on Sunday that he has called for an evaluation of how the judicial branch handles allegations of sexual harassment.\n\"I've always had a broad sense of humor and a candid way of speaking to both male and female law clerks alike,\" Kozinski wrote.\nIt grieves me to learn that I caused any of my clerks to feel uncomfortable; this was never my intent.\"\n\"I have great confidence in the men and women who comprise our judiciary,\" Roberts wrote.\nIn this year's report, he commended the judiciary for its response to a series of natural disasters this year."
  }
]);
db.articles.createIndex({ cluster: 1 });
db.articles.createIndex({ source: 1 });