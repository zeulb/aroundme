import React, { Component } from 'react';
import { connect } from "react-redux"
import Feeds from './Feeds';
import UserProfileCard from './UserProfileCard';
import AddButton from './AddButton';
import * as AppActions from '../actions/appActions';
import "./MyFeedView.css";
import Arrow from '../assets/arrow.svg';

class MyFeedView extends Component {
  getEvents() {
    return this.props.events
      .filter(event => (event.creator.id === parseInt(this.props.user.id, 10)))
      .sort((x, y) => y.timestamp - x.timestamp);
  }

  display() {
    if (this.props.displayImages) {
      return {
        display: 'none'
      }
    } else {
      return {
        display: 'block'
      }
    }
  }

  renderGuide() {
    if (this.showGuide()) {
      return (
        <div className="MyFeedView-guide">
          Create an event now!
        </div>
      );
    } else {
      return null;
    }
  }

  renderGuideLine() {
    if (this.showGuide()) {
      return (
        <img className="MyFeedView-guideLine" src={Arrow} alt="Arrow"/>
      );
    } else {
      return null;
    }
  }

  showGuide() {
    return (this.getEvents().length === 0 && !this.props.feedExpandedEvent && this.props.currentUserId === this.props.user.id);
  }

  render() {
    return (
      <div id="FeedView" className="MyFeedView" style={this.display()}>
        <UserProfileCard
          user={this.props.user}
          numEvents={this.getEvents().length}
        />
        <Feeds autoExpand={false} displayCreator={false} events={this.getEvents()} myFeed={true}/>
        {(!this.props.feedExpandedEvent && this.props.currentUserId === this.props.user.id) ? <AddButton returnPage={AppActions.Page.MY_FEED} /> : null}
        {this.renderGuide()}
        {this.renderGuideLine()}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    feedExpandedEvent: store.app.feedExpandedEvent,
    user: store.app.pageArg.profileUser,
    currentUserId: store.app.user.id
  };
})(MyFeedView);
