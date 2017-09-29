import React, { Component } from 'react';
import { connect } from "react-redux"
import Feeds from './Feeds';
import "./MyFeedView.css";

class MyFeedView extends Component {
  getEvents() {
    return this.props.events
      .filter(event => (event.creator.id === this.props.currentUserId))
      .sort((x, y) => y.timestamp - x.timestamp);
  }

  render() {
    return (
      <div className="MyFeedView">
        <Feeds events={this.getEvents()} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    currentUserId: store.app.user.id
  };
})(MyFeedView);
