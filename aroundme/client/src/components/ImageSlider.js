import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import "./ImageSlider.css";

class ImageSlider extends Component {
  render() {
    return (
      <SwipeableViews className="ImageSlider">
        {this.props.images.map(image => {
          return <div className="ImageSlider-imageContainer" >
            <img className="ImageSlider-image" src={image} />
          </div>;
        })}
      </SwipeableViews>
    );
  }
}

export default ImageSlider;
