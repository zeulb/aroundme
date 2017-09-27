import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import GuestPicture from '../assets/user-icon.svg';
import FbLogin from '../assets/fb-login.png';
import './UserCard.css';

class UserCard extends Component {
  renderImage() {
    if (this.props.isLoggedIn) {
      return <img className="UserCard-profilePicture" src={this.props.user.pictureUrl} alt={this.props.user.fullName} />;
    } else {
      return <img className="UserCard-profilePicture" src={GuestPicture} alt="GuestPicture" />
    }
  }

  renderAvatar() {
    return (
      <Paper className="UserCard-avatar" circle={true}>
        {this.renderImage()}
      </Paper>
    );
  }

  renderName() {
    return (
      <div className="UserCard-name">
          {this.props.user.fullName}
      </div>
    );
  }

  renderLogin() {
    return (
      <img className="UserCard-fbLogin" src={FbLogin} alt="FacebookLogin" onClick={this.props.onLogin} />
    );
  }

  render() {
    return (
      <div className="UserCard">
        {this.renderAvatar()}
        {this.props.isLoggedIn ? this.renderName() : null}
        {!this.props.isLoggedIn ? this.renderLogin() : null}
      </div>
    );
  }
}

export default UserCard;

