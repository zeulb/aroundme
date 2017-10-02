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
      .filter(event => (event.creator.id === parseInt(this.getUser().id, 10)))
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

  getUser() {
    if (this.props.user && (this.props.currentUser.id !== this.props.user.id)) {
      return this.props.user;
    } else {
      return this.props.currentUser;
    }
  }

  showGuide() {
    return (this.getEvents().length === 0 && !this.props.feedExpandedEvent && this.props.currentUser.id === this.getUser().id);
  }

  render() {
    return (
      <div id="FeedView" className="MyFeedView" style={this.display()}>
        <UserProfileCard
          user={this.getUser()}
          numEvents={this.getEvents().length}
          ownProfile={this.props.currentUser.id === this.getUser().id}
        />
        <Feeds autoExpand={false} displayCreator={false} events={this.getEvents()} myFeed={true}/>
        {(this.getEvents().length === 0) ? <AddButton returnPage={AppActions.Page.MY_FEED} /> : null}
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
    currentUser: store.app.user
  };
})(MyFeedView);
