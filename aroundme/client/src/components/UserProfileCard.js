import React, { Component } from 'react';
import './UserProfileCard.css';

class UserProfileCard extends Component {

  renderAvatar() {
    return (
        <img className="UserProfileCard-avatar" src={this.props.user.pictureUrl} alt={this.props.user.fullName} />
    );
  }

  renderDetails() {
    return (
        <div className="UserProfileCard-text"> 
          <div className="UserProfileCard-name">{this.props.user.fullName}</div>
          <div className="UserProfileCard-bottom">
            <div className="UserProfileCard-aboutMe">A veteran cheapskate, explains why i love freebies. </div>
            {this.renderEventCount()}
          </div>
        </div>
    );
  }

  renderEventCount() {
    return (
      <div className="UserProfileCard-event">
        <div className="UserProfileCard-eventCount">{this.props.numEvents}</div>
        <div className="UserProfileCard-eventText">{this.props.numEvents !== 1 ? "events" : "event"}</div>
      </div>
    )
  }

  render() {
    return (
      <div className="UserProfileCard">
        {this.renderAvatar()}
        {this.renderDetails()}
      </div>
      );
  }
}

export default UserProfileCard;
