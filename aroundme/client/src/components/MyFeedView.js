import React, { Component } from 'react';
import { connect } from "react-redux"
import Feeds from './Feeds';
import UserProfileCard from './UserProfileCard';
import "./MyFeedView.css";

class MyFeedView extends Component {
  getEvents() {
    return this.props.events
      .filter(event => (event.creator.id === parseInt(this.props.currentUserId, 10)))
      .sort((x, y) => y.timestamp - x.timestamp);
  }

  render() {
    return (
      <div className="MyFeedView">
        <UserProfileCard
          user={this.props.user}
          numEvents={this.getEvents().length}
        />
        <Feeds autoExpand={false} displayCreator={false} events={this.getEvents()} />
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
