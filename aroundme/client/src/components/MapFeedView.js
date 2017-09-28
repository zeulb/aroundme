import React, { Component } from 'react';
import Feeds from './Feeds';
import "./MapFeedView.css";

class MapFeedView extends Component {
  render() {
    return (
      <div className="MapFeedView">
        <Feeds events={this.props.events} />
      </div>
    );
  }
}

export default MapFeedView;
