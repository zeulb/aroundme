import React, { Component } from 'react';
import { connect } from "react-redux";
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import * as AppActions from '../actions/appActions';
import ImageSlider from './ImageSlider';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import "./ImageView.css";

class ImageView extends Component {
  state = {
    currentIndex: this.props.startImageIndex
  }

  renderImages() {
    return (
      <ImageSlider
        defaultIndex={this.props.startImageIndex}
        onChangeIndex={this.onChangeIndex}
        images={
          this.props.images.map(image => {
            return {
              type: 'image',
              image
            }
          })
        }
      />
    );
  }

  onChangeIndex = (index) => {
    this.setState({
      currentIndex: index
    });
  }

  onCloseButtonClick = () => {
    this.props.dispatch(AppActions.closeImages());
  };

  render() {
    return (
      <div className="ImageView">
        <IconButton className="ImageView-closeButton" onClick={this.onCloseButtonClick} >
          <NavigationClose color={white}/>
        </IconButton>
        <div className="ImageView-count">
          {this.state.currentIndex + 1} of {this.props.images.length}
        </div>
        <div className="ImageView-images">
          {this.renderImages()}
        </div>
      </div>
    );
  }
}

export default connect()(ImageView);
