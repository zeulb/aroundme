import React, { Component } from 'react';
import { connect } from "react-redux"
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as AppActions from '../actions/appActions';
import * as FormActions from '../actions/formActions';
import ImageInput from './ImageInput';
import './AddButton.css';

class AddButton extends Component {

  onClick = () => {
    this.imageInput.open()
      .then(image => {
        this.props.dispatch(AppActions.switchPage(AppActions.Page.ADD));
        this.props.dispatch(FormActions.addImage(image));
      });
  }

  imageInputRef = (input) => {
    this.imageInput = input;
  }

  render() {
    return (
      <FloatingActionButton
        className="AddButton"
        onClick={this.onClick}>
        <ContentAdd />
        <ImageInput ref={this.imageInputRef} />
      </FloatingActionButton>
    );
  }
}

export default connect()(AddButton);