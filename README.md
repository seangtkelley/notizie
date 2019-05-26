# Notizie

This project is a continuation of one of my previous projects. My blog post about it can be found [here](http://seangtkelley.me/blog/2018/01/03/news-article-clustering).

Essentially, my goal was to use clustering algorithms to discover news stories using articles from different news sources. Although, my original method was rather simple and naive, it showed promise in story discovery.

In this project, I'm employ a slightly different approach. Since I wrote the blog post in January 2018, it seems it has only gotten more difficult to consume news in a balanced and unbiased fashion. I especially became aware of the damage of news echo chambers or "bubbles" where the same content and most importantly ideas are distributed and amplified without challenge.

Around the same time, I found the [Media Bias Chart](https://www.adfontesmedia.com/wp-content/uploads/2018/08/Media-Bias-Chart_4.0_8_28_2018-min.jpg) created by [Ad Fontes Media](https://www.adfontesmedia.com/). Although obviously not without bias itself, the chart is a fantastic visualization of the biases of media outlets from across the journaistic spectrum.

In this project, I seek to implement an algorithm that discovers stories via the "fact reporting" news outlets. Then, it will find analyses and opinion pieces from other outlets and subsequently assign those articles to a discovered story. Then, via a web interface, users will be able to see visually how media from all sides of the political landscape is reporting/covering/spinning a story.

Through the visualization, users will be able to see how media bias manifests itself in their news from day to day.

## Setup

1. Python requirements
2. Create clusters
2. Node install
3. Run server
