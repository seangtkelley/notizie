import React from 'react';
import { Link } from 'react-router';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Issue Tracker Dashboard</h2>
        <ul>
          <li><Link to="/issues">Login</Link></li>
        </ul>
      </div>
    );
  }
}