import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import "./ImageSlider.css";

class ImageSlider extends Component {
  renderImage(image, alt) {
    if (image.type.startsWith('image')) {
      return <img className="ImageSlider-image" src={image.image} alt={alt} />;
    } else {
      return <video className="ImageSlider-image" src={image.image} alt={alt} autoplay/>;
    }
  }

  render() {
    return (
      <SwipeableViews
        index={this.props.defaultIndex || 0}
        className="ImageSlider"
        resistance={true}>
        {this.props.images.map((image, index) => {
          return <div className="ImageSlider-imageContainer" key={`ImageSlider-container.${index}`}>
            {this.renderImage(image, `ImageSlider.${index}`)}
          </div>;
        })}
      </SwipeableViews>
    );
  }
}

export default ImageSlider;
