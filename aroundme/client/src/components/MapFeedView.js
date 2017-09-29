import React, { Component } from 'react';
import Feeds from './Feeds';
import "./MapFeedView.css";

class MapFeedView extends Component {
  getEvents() {
    return this.props.events.sort((x, y) => y.timestamp - x.timestamp);
  }

  render() {
    return (
      <div className="MapFeedView">
        <Feeds events={this.getEvents()} />
      </div>
    );
  }
}

export default MapFeedView;
