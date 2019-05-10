import React from 'react';
import { Link } from 'react-router';

function Cluster(props) {
  return (
    <div className="col-6" style={{ float: props.float }}>
      <div className="card" style={{ width: '100%', marginBottom: '20px' }}>
        <div className="row cap-img-row">
          {
            props.cluster.articles.map((article, i) => {
              if (i < 4) {
                return (
                  <div key={article._id} className="col-md-6 cap-img">
                    <img className="card-img-top" src={article.top_image} alt="Card image cap" />
                  </div>
                )
              }
            })
          }
        </div>
        <div className="card-body">
          <h4 className="card-title">
            <Link to={`/cluster/${props.cluster.id}`} >{props.cluster.title}</Link>
          </h4>
          <p className="card-text">Number of Articles: {props.cluster.articles.length}</p>
        </div>
        <ul className="list-group list-group-flush">
          {
            props.cluster.articles.map((article, i) => {
              if (i < 4) {
                return <li key={article._id} className="list-group-item"><a href={article.url} target="_blank">{article.title}</a></li>;
              }
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: []
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch('/api/clusters').then(response => {
      if (response.ok) {
        response.json().then(clusterdata => {

          for(let i=0; i < clusterdata.records.length; i++){
            fetch(`/api/articles?cluster=${clusterdata.records[i]._id}`).then(response => {
              if (response.ok) {
                response.json().then(articledata => {
                  let cluster = clusterdata.records[i];
                  cluster.articles = articledata.records;
                  this.state.clusters.push(cluster);

                  if(i === clusterdata.records.length-1){
                    this.setState({ clusters: this.state.clusters });
                  }
                });
              } else {
                response.json().then(error => {
                  console.log("Failed to fetch issues:" + error.message)
                });
              }
            }).catch(err => {
              console.log("Error in fetching data from server:", err);
            });
          }
        });
      } else {
        response.json().then(error => {
          console.log("Failed to fetch issues:" + error.message)
        });
      }
    }).catch(err => {
      console.log("Error in fetching data from server:", err);
    });
  }

  render() {
    const old_clusters = this.state.clusters.filter(obj => obj.algo === 0).map((cluster, i) => (
      <Cluster key={cluster._id} cluster={cluster} float={((i % 2 === 0) ? 'left' : 'right')}/>
    ));
    const prob_clusters = this.state.clusters.filter(obj => obj.algo === 1).map((cluster, i) => (
      <Cluster key={cluster._id} cluster={cluster} float={((i % 2 === 0) ? 'left' : 'right')}/>
    ));
    const twitter_clusters = this.state.clusters.filter(obj => obj.algo === 2).map((cluster, i) => (
      <Cluster key={cluster._id} cluster={cluster} float={((i % 2 === 0) ? 'left' : 'right')}/>
    ));
    return (
      <div className="container">
        <div className="dashhead">
          <div className="dashhead-titles">
            <h6 className="dashhead-subtitle">Dashboards</h6>
            <h3 className="dashhead-title">Overview</h3>
          </div>

          <div className="dashhead-toolbar">
            <div id="time-selectors" className="btn-group dashhead-toolbar-item btn-group-thirds">
              <button type="button" className="btn btn-outline-primary active">Today</button>
              <button type="button" className="btn btn-outline-primary">7d</button>
              <button type="button" className="btn btn-outline-primary">1M</button>
            </div>
          </div>
        </div>

        <ul className="nav nav-bordered mt-4 mt-md-2 mb-0 clearfix" role="tablist">
          <li className="nav-item" role="presentation">
            <a href="#old" className="nav-link active" role="tab" data-toggle="tab" aria-controls="traffic">Old Method (KMeans)</a>
          </li>
          <li className="nav-item" role="presentation">
            <a href="#prob" className="nav-link" role="tab" data-toggle="tab" aria-controls="sales">Probabilistic KMeans</a>
          </li>
          <li className="nav-item" role="presentation">
            <a href="#twitter" className="nav-link" role="tab" data-toggle="tab" aria-controls="support">Twitter Hashtags</a>
          </li>
        </ul>

        <hr className="mt-0 mb-5" />

        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active" id="old">{old_clusters}</div>
          <div role="tabpanel" className="tab-pane" id="prob">{prob_clusters}</div>
          <div role="tabpanel" className="tab-pane" id="twitter">{twitter_clusters}</div>
        </div>
      </div>
    );
  }
}