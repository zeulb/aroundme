import React, { Component } from 'react';
import * as moment from 'moment';
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="Comment" key={`Comment.${this.props.id}`} >
        <div className="Comment-user">
          <img className="Comment-userPicture" src={this.props.owner.pictureUrl} alt="UserPicture" />
        </div>
        <div className="Comment-main">
          <div className="Comment-info">
            <span className="Comment-ownerName">
              {this.props.owner.name}
            </span>
            <span className="Comment-time">
              {moment(this.props.timestamp).fromNow()}
            </span>
          </div>
          <div className="Comment-content">
            {this.props.content}
          </div>
        </div>
      </div>
    );
  }
}

export default (Comment);
