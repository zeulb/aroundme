import React, { Component } from 'react';
import * as moment from 'moment';
import './Comment.css';

class Comment extends Component {
  render() {
    return (
      <div className="Comment">
        <div className="Comment-user">
          <img className="Comment-userPicture" src={localStorage.getItem('pictureUrl')} alt="UserPicture" />
        </div>
        <div className="Comment-main">
          <div className="Comment-info">
            <span className="Comment-ownerName">
              Stefano Chiesaasdasdadsads
            </span>
            <span className="Comment-time">
              {moment(Date.now()).fromNow()}
            </span>
          </div>
          <div className="Comment-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, lacus sit amet porttitor iaculis, enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, lacus sit amet porttitor iaculis, enim turpis porttitor erat, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet, 
          </div>
        </div>
      </div>
    );
  }
}

export default (Comment);
