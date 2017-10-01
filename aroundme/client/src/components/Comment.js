import React, { Component } from 'react';
import { connect } from "react-redux"
import * as moment from 'moment';
import * as AppActions from '../actions/appActions';
import './Comment.css';

class Comment extends Component {
  onViewUser = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MY_FEED, { profileUser: this.props.owner }));
  }

  render() {
    return (
      <div className="Comment" key={`Comment.${this.props.id}`} >
        <div className="Comment-user">
          <img className="Comment-userPicture" src={this.props.owner.pictureUrl} alt="UserPicture" onClick={this.onViewUser} />
        </div>
        <div className="Comment-main">
          <div className="Comment-info">
            <span className="Comment-ownerName">
              {this.props.owner.name}
            </span>
            <span className="Comment-time">
              {moment(this.props.timestamp).fromNow(true)}
            </span>
          </div>
          <div className="Comment-content">
            {this.props.content.split('\n').map(line => <div>{line}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Comment);
