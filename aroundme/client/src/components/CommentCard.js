import React, { Component } from 'react';
import './CommentCard.css';
import Comment from './Comment';
import CommentBar from './CommentBar';

var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.animateScroll;

class CommentCard extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.comments.length !== prevProps.comments.length) {
      scroller.scrollToBottom({
        containerId: 'FeedView'
      });
    }
  }

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
          {this.props.comments.map(comment => <Comment key={`Comment.${comment.id}`} {...comment} />)}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="CommentCard">
        {this.renderComments()}
        <Element name="CommentCard-last"></Element>
        <CommentBar id={this.props.id} />
      </div>
    );
  }
}

export default (CommentCard);
