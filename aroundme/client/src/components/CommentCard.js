import React, { Component } from 'react';
import './CommentCard.css';
import Comment from './Comment';
import CommentBar from './CommentBar';

class CommentCard extends Component {
  renderComments = () => {
    if (this.props.comments.length === 0) {
      return (
        <div className="CommentCard-firstToComment">
          Be the first person to comment.
        </div>
      );
    } else {
      return (
        <div className="CommentCard-commentList">
          {this.props.comments.map(comment => <Comment {...comment} />)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="CommentCard">
        {this.renderComments()}
        <CommentBar />
      </div>
    );
  }
}

export default (CommentCard);
