import newspaper
import feedparser
import pandas as pd
import math
import nltk
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import KMeans
from nltk.stem.snowball import SnowballStemmer
from datetime import datetime, timedelta
import pymongo

from sklearn.feature_extraction import text
eng_contractions = ["ain't", "amn't", "aren't", "can't", "could've", "couldn't",
                    "daresn't", "didn't", "doesn't", "don't", "gonna", "gotta",
                    "hadn't", "hasn't", "haven't", "he'd", "he'll", "he's", "how'd",
                    "how'll", "how's", "I'd", "I'll", "I'm", "I've", "isn't", "it'd",
                    "it'll", "it's", "let's", "mayn't", "may've", "mightn't",
                    "might've", "mustn't", "must've", "needn't", "o'clock", "ol'",
                    "oughtn't", "shan't", "she'd", "she'll", "she's", "should've",
                    "shouldn't", "somebody's", "someone's", "something's", "that'll",
                    "that're", "that's", "that'd", "there'd", "there're", "there's",
                    "these're", "they'd", "they'll", "they're", "they've", "this's",
                    "those're", "tis", "twas", "twasn't", "wasn't", "we'd", "we'd've",
                    "we'll", "we're", "we've", "weren't", "what'd", "what'll",
                    "what're", "what's", "what've", "when's", "where'd", "where're",
                    "where's", "where've", "which's", "who'd", "who'd've", "who'll",
                    "who're", "who's", "who've", "why'd", "why're", "why's", "won't",
                    "would've", "wouldn't", "y'all", "you'd", "you'll", "you're",
                    "you've", "'s", "s", "n't"
                    ]
common_junk = [
    "said", "told"
]
eng_contractions.extend(common_junk)
custom_stopwords = text.ENGLISH_STOP_WORDS.union(eng_contractions)

def tokenize_and_stem(txt):
    stemmer = SnowballStemmer("english")

    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word for sent in nltk.sent_tokenize(
        txt) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    stems = [stemmer.stem(t) for t in filtered_tokens]
    return stems


def tokenize_only(txt):
    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word.lower() for sent in nltk.sent_tokenize(txt)
              for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    return filtered_tokens


def get_articles_from_source(source, category, date_str):

    articles = []

    archive_base_url = "https://web.archive.org/web/"

    if category == 'politics':
        url = archive_base_url + date_str + "/" + \
            source['politics_rss_url'] if len(
                date_str) > 0 else source['politics_rss_url']
        feed = feedparser.parse(url)
    elif category == 'world':
        url = archive_base_url + date_str + "/" + \
            source['world_rss_url'] if len(date_str) > 0 else source['world_rss_url']
        feed = feedparser.parse(url)
    elif category == 'finance':
        url = archive_base_url + date_str + "/" + \
            source['finance_rss_url'] if len(
                date_str) > 0 else source['finance_rss_url']
        feed = feedparser.parse(url)
    else:
        raise Exception("Invalid category")

    article_links = []
    for entry in feed['entries']:
        article_links.append(entry['link'])

    for link in article_links:
        try:
            article = newspaper.Article(link)

            article.download()
            article.parse()
            article.nlp()

            articles.append({
                "source": source['abbr'],
                "url": article.url,
                "title": article.title,
                "authors": ";".join(article.authors),
                "top_image": article.top_image,
                "text": article.text,
                "summary": article.summary,
                "timestamp": article.publish_date
            })
        except Exception as e:
            pass

    return articles


def fetch_articles(sources, type_str, category):
    articles = []
    if type_str == 'current':
        for source in sources:
            print(source['abbr'])
            articles.extend(get_articles_from_source(source, category, ''))
    else:
        if type_str == '24h':
            delta = timedelta(days=1)
            end = datetime.utcnow()
            start = end - delta
        elif type_str == '7d':
            delta = timedelta(days=7)
            end = datetime.utcnow()
            start = end - delta
        elif type_str == '1m':
            delta = timedelta(days=30)
            end = datetime.utcnow()
            start = end - delta
        elif type_str == '1y':
            delta = timedelta(days=365)
            end = datetime.utcnow()
            start = end - delta
        else:
            dates = type_str.split("|")
            start = datetime.strptime("%Y-%m-%d", dates[0])
            end = datetime.strptime("%Y-%m-%d", dates[1])

        # loop through dates from start to end
        current_date = start
        increment = timedelta(days=1)
        while current_date <= end:
            print(current_date)
            # create archive friendly date string
            date_str = current_date.strftime("%Y%m%d")

            for source in sources:
                print(source['abbr'])

                articles.extend(get_articles_from_source(
                    source, category, date_str))

            # time step
            current_date += increment

    df = pd.DataFrame(articles)
    return df.drop_duplicates()


def update_clusters(type_str, category):
    # get database connection
    mgclient = pymongo.MongoClient("mongodb://localhost/")
    mydb = mgclient["notizie"]

    # delete all old objects
    mydb['clusters'].delete_many({'algo': 0})

    # get sources
    sources = mydb['sources'].find()

    # fetch articles
    articles = fetch_articles(sources, type_str, category)

    # use extend so it's a big flat list of vocab
    totalvocab_stemmed = []
    totalvocab_tokenized = []
    for i in articles['text']:
        # for each item in 'synopses', tokenize/stem
        allwords_stemmed = tokenize_and_stem(i)
        # extend the 'totalvocab_stemmed' list
        totalvocab_stemmed.extend(allwords_stemmed)

        allwords_tokenized = tokenize_only(i)
        totalvocab_tokenized.extend(allwords_tokenized)

    vocab_frame = pd.DataFrame(
        {'words': totalvocab_tokenized}, index=totalvocab_stemmed)

    # define vectorizer parameters
    tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=200000,
                                       min_df=0.2, stop_words=custom_stopwords,
                                       use_idf=True, tokenizer=tokenize_and_stem, ngram_range=(1, 3))

    tfidf_matrix = tfidf_vectorizer.fit_transform(articles['text'])  # fit the vectorizer to synopses

    terms = tfidf_vectorizer.get_feature_names()

    # dist = 1 - cosine_similarity(tfidf_matrix)

    num_clusters = int(math.sqrt(articles.shape[0] / 2) * 1.5)

    km = KMeans(n_clusters=num_clusters)

    km.fit(tfidf_matrix)

    clusters = km.labels_.tolist()

    articles['cluster'] = clusters

    # sort cluster centers by proximity to centroid
    order_centroids = km.cluster_centers_.argsort()[:, ::-1]

    for cluster_num in range(num_clusters):

        top_words = []
        # replace 10 with n words per cluster
        for ind in order_centroids[cluster_num, :10]:
            top_words.append(
                vocab_frame.loc[terms[ind].split(' ')].values.tolist()[0][0])
        name = ", ".join(top_words)

        cluster = dict(type=type_str, algo=0, category=category, title=name)
        cluster_doc = mydb['clusters'].insert_one(cluster)

        for _, article in articles.iterrows():
            if article['cluster'] == cluster_num:
                # find the source
                source = mydb['sources'].find_one({'abbr': article['source']})

                # create article object
                new_article = dict(cluster=str(cluster_doc.inserted_id),
                                   title=str(article['title']),
                                   articles=str(article['authors']),
                                   top_image=str(article['top_image']),
                                   source=str(source['_id']),
                                   url=str(article['url']),
                                   summary=str(article['summary']),
                                   text=str(article['text']))

                mydb['articles'].insert_one(new_article)


def update_clusters_new(type_str, category):
    # get database connection
    mgclient = pymongo.MongoClient("mongodb://localhost/")
    mydb = mgclient["notizie"]

    # delete all old objects
    mydb['clusters'].delete_many({'algo': 1})

    # get sources
    sources = mydb['sources'].find()

    # fetch articles
    articles = fetch_articles(sources, type_str, category)

    # use extend so it's a big flat list of vocab
    totalvocab_stemmed = []
    totalvocab_tokenized = []
    for i in articles['title']:
        # for each item in 'synopses', tokenize/stem
        allwords_stemmed = tokenize_and_stem(i)
        # extend the 'totalvocab_stemmed' list
        totalvocab_stemmed.extend(allwords_stemmed)

        allwords_tokenized = tokenize_only(i)
        totalvocab_tokenized.extend(allwords_tokenized)

    vocab_frame = pd.DataFrame(
        {'words': totalvocab_tokenized}, index=totalvocab_stemmed)

    # define vectorizer parameters
    tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=200000,
                                       min_df=0.05, stop_words=custom_stopwords,
                                       use_idf=True, tokenizer=tokenize_and_stem, ngram_range=(1, 5))

    tfidf_matrix = tfidf_vectorizer.fit_transform(articles['title'])  # fit the vectorizer to synopses

    terms = tfidf_vectorizer.get_feature_names()

    # dist = 1 - cosine_similarity(tfidf_matrix)

    num_clusters = 8

    km = KMeans(n_clusters=num_clusters)

    km.fit(tfidf_matrix)

    clusters = km.labels_.tolist()

    articles['cluster'] = clusters

    # sort cluster centers by proximity to centroid
    order_centroids = km.cluster_centers_.argsort()[:, ::-1]
    print(km.cluster_centers_)

    for cluster_num in range(num_clusters):

        top_words = []
        # replace 10 with n words per cluster
        for ind in order_centroids[cluster_num, :10]:
            top_words.append(
                vocab_frame.loc[terms[ind].split(' ')].values.tolist()[0][0])
            print(vocab_frame.loc[terms[ind].split(' ')].values.tolist())
        name = ", ".join(top_words)

        cluster = dict(type=type_str, algo=1, category=category, title=name)
        cluster_doc = mydb['clusters'].insert_one(cluster)

        for _, article in articles.iterrows():
            if article['cluster'] == cluster_num:
                # ignore if too far away from cluster centroid

                # find the source
                source = mydb['sources'].find_one({'abbr': article['source']})

                # create article object
                new_article = dict(cluster=str(cluster_doc.inserted_id),
                                   title=str(article['title']),
                                   articles=str(article['authors']),
                                   top_image=str(article['top_image']),
                                   source=str(source['_id']),
                                   url=str(article['url']),
                                   summary=str(article['summary']),
                                   text=str(article['text']))

                mydb['articles'].insert_one(new_article)

#update_clusters('current', 'politics')
update_clusters_new('current', 'politics')