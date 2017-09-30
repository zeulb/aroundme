import React, { Component } from 'react';
import './CommentCard.css';
import Comment from './Comment';

class CommentCard extends Component {
  render() {
    return (
      <div className="CommentCard">
        <Comment />
        <Comment />
      </div>
    );
  }
}

export default (CommentCard);
