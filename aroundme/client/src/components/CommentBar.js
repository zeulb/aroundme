import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as MapActions from '../actions/mapActions';
import * as Icons from 'material-ui/svg-icons';
import { connect } from "react-redux"
import './CommentBar.css';

var Scroll = require('react-scroll');
var scroller = Scroll.animateScroll;

class CommentBar extends Component {
  state = {
    commentText: ''
  };

  onTextFocus = (event) => {
    scroller.scrollToBottom();
    scroller.scrollToBottom({
      containerId: 'FeedView'
    });
  }

  onTextChange = (event) => {
    this.setState({
      commentText: event.target.value
    });
  }

  onSubmit = (event) => {
    this.props.dispatch(MapActions.comment(this.props.id, this.state.commentText));
    this.setState({
      commentText: ''
    });
  }

  render() {
    if (this.props.user) {
      return null;
    }
    return (
      <div className="CommentBar">
        <img className="CommentBar-userPicture" src={this.props.user.pictureUrl} alt="UserPicture" />
        <TextField
          className={
            "CommentBar-textField" + 
              ((/iPhone|iPad|iPod/i.test(navigator.userAgent))
                 ? " CommentBar-textField--iOS"
                 : "")
          }
          hintText="Write a comment..."
          multiLine={true}
          rows={1}
          rowsMax={3}
          fullWidth={true}
          underlineShow={false}
          textareaStyle={{
            marginTop: '14px',
            marginBottom: '-14px'
          }}
          value={this.state.commentText}
          hintStyle={{ bottom: '14px' }}
          onFocus={this.onTextFocus}
          onChange={this.onTextChange}
        />
        <FloatingActionButton
          mini={true}
          className="CommentBar-sendButton"
          secondary
          onClick={this.onSubmit}
          zDepth={0}>
          <Icons.ContentSend />
        </FloatingActionButton>
      </div>
    );
  }
}

export default connect(store => {
  return {
    user: store.app.user
  }
})(CommentBar);
