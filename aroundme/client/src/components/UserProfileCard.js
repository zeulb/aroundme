import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './UserProfileCard.css';

class UserProfileCard extends Component {

  renderAvatar() {
    return (
        <Paper className="UserProfileCard-avatar" circle={true}>
          <img className="UserProfileCard-profilePicture" src={this.props.user.pictureUrl} alt={this.props.user.fullName} />
        </Paper>
    );
  }

  renderDetails() {
    return (
        <div className="UserProfileCard-text"> 
          <div className="UserProfileCard-name">{this.props.user.fullName}</div>
          {this.renderNumEvents()}
        </div>
    );
  }

  renderNumEvents() {
    return this.props.numEvents === 0?
      (<div>Create one through "Discover Events" now!</div>)
      :
      this.props.numEvents === 1?
      (<div>1 event</div>)
      :
      (<div>{this.props.numEvents} events</div>);
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
