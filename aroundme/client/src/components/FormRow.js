import React, { Component } from 'react';
import { connect } from "react-redux"
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import ImageInput from './ImageInput';
import * as AppActions from '../actions/appActions';
import * as FormActions from '../actions/formActions';
import "./FormRow.css";

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

class FormRow extends Component {
  state = {
    lastImagesAddedCount: 0
  };

  onPhotoClick = () => {
    this.imageInput.openPhotoLibrary()
      .then(images => {
        this.props.dispatch(FormActions.addImages(images));
        this.lastImagesAddedSet(images.length);
      });
  }

  onNextClick = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.SELECT_LOCATION));
  }

  lastImagesAddedSet = (count) => {
    this.setState({
      lastImagesAddedCount: count
    });
  }

  lastImagesAddedReset = () => {
    this.setState({
      lastImagesAddedCount: 0
    });
  }

  imageInputRef = (input) => {
    this.imageInput = input;
  }

  getSnackbarMessage() {
    if (this.state.lastImagesAddedCount === 1) {
      return "1 new image added";
    } else {
      return `${this.state.lastImagesAddedCount} new images added`;
    }
  }

  onTextFocus = (event) => {
    scroll.scrollToBottom();
  }

  render() {
    return (
      <div className="FormRow">
        <Snackbar
          open={this.state.lastImagesAddedCount > 0}
          message={this.getSnackbarMessage()}
          autoHideDuration={2500}
          onRequestClose={this.lastImagesAddedReset}
        />
        <ImageInput ref={this.imageInputRef} />
        <FloatingActionButton
          mini={true}
          className="FormRow-uploadButton"
          onClick={this.onPhotoClick}>
          <Icons.ImagePhotoCamera />
        </FloatingActionButton>
        <Paper className="FormRow-inputContainer">
          <TextField
            className={
              "FormRow-textField" + 
                ((/iPhone|iPad|iPod/i.test(navigator.userAgent))
                   ? " FormRow-textField--iOS"
                   : "")
            }
            hintText=" Add description..."
            multiLine={true}
            rows={1}
            rowsMax={3}
            fullWidth={true}
            underlineShow={false}
            onFocus={this.onTextFocus}
          />
        </Paper>
        <FloatingActionButton
          mini={true}
          className="FormRow-sendButton"
          onClick={this.onNextClick}>
          <Icons.ContentSend />
        </FloatingActionButton>
      </div>
    );
  }
}

export default connect()(FormRow);
