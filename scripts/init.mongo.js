// NEW

// Connect to the issuetracker database. Note, if the issuetracker database
// does not exist, it will create it with this call.
db = new Mongo().getDB('notizie');

// Next, we remove everything inside it. This is helpful to ensure that the
// database starts from a known state.
db.clusters.remove({});

// Now, we insert some mock data that mirrors the data that we have in the
// in-memory version of the `server.js` code.
db.clusters.insert([
  {
    "type": "current",
    "algo": 0,
    "title": "wrote, reporters, chiefs, federal, law, accusing, justice, worked, posted, announced"
  },
  {
    "type": "current",
    "algo": 1,
    "title": "trump, president, tweets, states, united, united, yearly, aides, new, country"
  }
]);

// Lastly, we create "indexes" to make searching faster. For this particular
// application we know that searching on the status, owner, and created properties
// will be common, so we create indexes on those.
db.clusters.createIndex({ fakeid: 1 });


db.sources.remove({});
db.sources.insert([
  {
    'fakeid': 1,
    'abbr': 'CNN',
    'full_name': 'Cable News Network',
    'home_url': 'http://www.cnn.com/politics',
    'politics_rss_url': 'http://rss.cnn.com/rss/cnn_allpolitics.rss',
    'bias': -6,
    'type': 32
  },
  {
    'fakeid': 2,
    'abbr': 'FNC',
    'full_name': 'Fox News Channel',
    'home_url': 'http://www.foxnews.com/politics.html',
    'politics_rss_url': 'http://feeds.foxnews.com/foxnews/politics',
    'bias': 27,
    'type': 20
  },
  {
    'fakeid': 3,
    'abbr': 'WAPO',
    'full_name': 'Washington Post',
    'home_url': 'https://www.washingtonpost.com/politics/',
    'politics_rss_url': 'http://feeds.washingtonpost.com/rss/politics',
    'bias': -10,
    'type': 51
  },
]);
db.sources.createIndex({ fakeid: 1 });


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
  },
  {
    "cluster": "163",
    "title": "Chief Justice Roberts promises review of sexual harassment policies in federal courts",
    "source": 2,
    "authors": "Joe Journalist",
    "url": "http://feeds.foxnews.com/~r/foxnews/politics/~3/GbR4_rR1wNI/chief-justice-roberts-promises-review-sexual-harassment-policies-in-federal-courts.html",
    "top_image": "http://a57.foxnews.com/images.foxnews.com/content/fox-news/politics/2018/01/01/chief-justice-roberts-promises-review-sexual-harassment-policies-in-federal-courts/_jcr_content/par/featured_image/media-0.img.jpg/0/0/1514831176344.jpg?ve=1",
    "summary": "Chief Justice John Roberts has ordered a \"careful evaluation\" of the judiciary's standards of conduct and policies, saying the federal courts are not immune to the nationwide focus of sexual misconduct in the workplace.\nThe remarks came in Roberts' annual year-end report Sunday on the third branch of government, which he heads as chief justice.\nAn internal judicial misconduct inquiry was launched, but Kozinski left his job soon afterward.\nA spokesman for the 9th Circuit also confirmed at least one of Kozinski’s current law clerks had resigned, but offered no further details, citing confidentiality and privacy policies.\nThe chief justice spent most of 16-page report speaking about natural disasters, especially deadly hurricanes, and their effect on the federal courts in Texas, Florida, Puerto Rico, and the U.S. Virgin Islands."
  },
  {
    "cluster": "163",
    "title": "Chief Justice Roberts says courts will examine protections against sexual harassment",
    "source": 3,
    "authors": "Pete Reporter",
    "url": "https://www.washingtonpost.com/politics/chief-justice-roberts-says-courts-will-examine-protections-against-sexual-harassment/2017/12/31/94a55d00-ee40-11e7-97bf-bba379b809ab_story.html",
    "top_image": "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2017/04/11/National-Politics/Images/2017-04-10T171640Z_354137631_RC1AB508B140_RTRMADP_3_USA-COURT-GORSUCH.jpg?t=20170517",
    "summary": "Chief Justice John G. Roberts Jr. announced an initiative Sunday to ensure there are proper procedures in place to protect law clerks and other court employees from sexual harassment, saying it is clear that the federal judiciary “is not immune” from a widespread problem.\nThe influential 67-year-old judge stepped down after two reports in The Washington Post detailed allegations he had subjected former law clerks and other women to inappropriate sexual behavior.\n[Powerful federal judge retires amid sexual harassment investigation]“Events in recent months have illuminated the depth of the problem of sexual harassment in the workplace, and events in the past few weeks have made clear that the judicial branch is not immune,” Roberts wrote.\nAn appeals court judge usually has four clerks and a secretary, and the chambers operate independently and under a strict code of confidentiality.\n“Court emergency preparedness is not headline news, even on a slow news day,” Roberts acknowledged."
  },
  {
    "cluster": "164",
    "title": "Trump on Iran: 'Time for change!'",
    "source": 1,
    "authors": "Name Namerson",
    "url": "http://rss.cnn.com/~r/rss/cnn_allpolitics/~3/i4YMgT72Gkk/index.html",
    "top_image": "http://cdn.cnn.com/cnnnext/dam/assets/171230172246-04-iranian-student-protests-super-tease.jpg",
    "summary": "Washington (CNN) President Donald Trump on Monday morning continued his daily tweets on the deadly protests in Iran, calling for change to an autocratic system there that he says is rife with repression and corruption.\n\"Iran is failing at every level despite the terrible deal made with them by the Obama Administration,\" Trump wrote.\n\"Big protests in Iran,\" Trump tweeted.\nThe unrest has prompted verbal sparring between Iran and the United States, with the White House and Trump on Friday urging Tehran to respect protesters' rights.\npic.twitter.com/kvv1uAqcZ9 — Donald J. Trump (@realDonaldTrump) December 30, 2017In the Saturday tweets, Trump posted videos of a speech he gave to the United Nations in September, in which he said , \"The entire world understands that the good people of Iran want change.\""
  },
  {
    "cluster": "164",
    "title": "Trump: Pakistan has 'given us nothing but lies & deceit'",
    "source": 1,
    "authors": "Cookie Monstor",
    "url": "http://rss.cnn.com/~r/rss/cnn_allpolitics/~3/QQ9dxuk5m58/index.html",
    "top_image": "http://cdn.cnn.com/cnnnext/dam/assets/171225140933-01-donald-trump-1224-super-tease.jpg",
    "summary": "Washington (CNN) In his first tweet of the new year President Donald Trump slammed Pakistan, saying the country has given the US nothing but \"lies and deceit.\"\n\"The United States has foolishly given Pakistan more than 33 billion dollars in aid over the last 15 years, and they have given us nothing but lies & deceit, thinking of our leaders as fools,\" Trump tweeted Monday morning .\n\"The United States has been very clear about the direction we want to go, and we hope to see some change in the coming weeks and months.\"\n\"This is a very positive moment for our country's relationship with Pakistan,\" Trump said, adding that the Pakistani government's cooperation \"is a sign that is honoring America wishes for it to do more to provide security in the region.\"\nTrump said Pakistan is \"starting to respect the United States again.\""
  },
  {
    "cluster": "164",
    "title": "Trump administration to continue to withhold military aid to Pakistan",
    "source": 1,
    "authors": "Some Guy",
    "url": "http://rss.cnn.com/~r/rss/cnn_allpolitics/~3/i60sNRhrKJw/index.html",
    "top_image": "http://cdn.cnn.com/cnnnext/dam/assets/171229130634-donald-trump-12-15-2017-super-tease.jpg",
    "summary": "(CNN) The White House said Monday that it will continue to withhold $255 million in military aid to Pakistan out of frustration over what it has characterized as Islamabad's obstinance in confronting terrorist networks.\n\"The United States does not plan to spend the $255 million in FY 2016 foreign military financing for Pakistan at this time,\" a National Security Council spokesman said.\nThe administration first said in August it was temporarily withholding the $255 million, which was part of a $1.1 billion aid package authorized in 2016 by Congress.\nThe National Security Council official said the administration would continue to review Pakistan's level of cooperation in security areas.\nPresident Donald Trump signaled Monday that he was prepared to cut off aid to Pakistan if the country failed to cooperate with the US."
  },
]);
db.articles.createIndex({ cluster: 1 });
db.articles.createIndex({ source: 1 });