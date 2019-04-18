import React from 'react';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
  render() {
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
          <div role="tabpanel" className="tab-pane active" id="old">
          </div>
        </div>

        <div role="tabpanel" className="tab-pane" id="prob">
        </div>

        <div role="tabpanel" className="tab-pane" id="twitter">
        </div>
      </div>
    );
  }
}