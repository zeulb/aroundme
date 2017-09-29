import React, { Component } from 'react';
import { connect } from "react-redux"
import Feeds from './Feeds';
import UserProfileCard from './UserProfileCard';
import "./MyFeedView.css";

class MyFeedView extends Component {
  getEvents() {
    return this.props.events
      .filter(event => (event.creator.id === this.props.currentUserId))
      .sort((x, y) => y.timestamp - x.timestamp);
  }

  render() {
    return (
      <div>
        <UserProfileCard
          user={this.props.user}
          numEvents={this.getEvents().length}
        />
        <div className="MyFeedView">
          <Feeds events={this.getEvents()} />
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    user: store.app.user,
    currentUserId: store.app.user.id
  };
})(MyFeedView);
