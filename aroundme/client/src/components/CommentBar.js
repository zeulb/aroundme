import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import './CommentBar.css';

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

class CommentBar extends Component {
  state = {
    commentText: ''
  };

  onTextFocus = (event) => {
    scroll.scrollToBottom();
  }

  onTextChange = (event) => {
    this.setState({
      commentText: event.target.value
    });
  }

  onSubmit = (event) => {

  }

  render() {
    return (
      <div className="CommentBar">
        <img className="CommentBar-userPicture" src={localStorage.getItem('pictureUrl')} alt="UserPicture" />
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

export default (CommentBar);
