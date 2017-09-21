import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import "./ImageSlider.css";

class ImageSlider extends Component {
  render() {
    return (
      <SwipeableViews
        className="ImageSlider"
        resistance={true}>
        {this.props.images.map((image, index) => {
          return <div className="ImageSlider-imageContainer" key={`ImageSlider-container.${index}`}>
            <img className="ImageSlider-image" src={image} alt={`ImageSlider.${index}`} />
          </div>;
        })}
      </SwipeableViews>
    );
  }
}

export default ImageSlider;
