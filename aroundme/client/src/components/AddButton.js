import React, { Component } from 'react';
import { connect } from "react-redux"
import * as Icons from 'material-ui/svg-icons';
import Avatar from 'material-ui/Avatar';
import { indigo300, white } from 'material-ui/styles/colors';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import * as AppActions from '../actions/appActions';
import * as FormActions from '../actions/formActions';
import ImageInput from './ImageInput';
import './AddButton.css';

class AddButton extends Component {

  onCameraClick = () => {
    this.imageInput.openCamera()
      .then(images => {
        this.props.dispatch(AppActions.switchPage(AppActions.Page.ADD));
        this.props.dispatch(FormActions.addImages(images));
      });
  }

  onPhotoClick = () => {
    this.imageInput.openPhotoLibrary()
      .then(images => {
        this.props.dispatch(AppActions.switchPage(AppActions.Page.ADD));
        this.props.dispatch(FormActions.addImages(images));
      });
  }

  imageInputRef = (input) => {
    this.imageInput = input;
  }

  render() {
    return (
      <SpeedDial
        positionH="left"
        positionV="bottom"
      >
        <BubbleList
          alignment="up"
          direction="right">
          <BubbleListItem
            key="AddButton-cameraButton"
            leftAvatar={<Avatar backgroundColor={white} color={indigo300} icon={<Icons.ImagePhotoCamera />} />}
            onClick={this.onCameraClick}
          />
          <BubbleListItem
            key="AddButton-photoButton"
            leftAvatar={<Avatar backgroundColor={white} color={indigo300} icon={<Icons.ImagePhotoLibrary />} />}
            onClick={this.onPhotoClick}
          />
          <ImageInput ref={this.imageInputRef} />
        </BubbleList>
      </SpeedDial>
    );
  }
}

export default connect()(AddButton);
