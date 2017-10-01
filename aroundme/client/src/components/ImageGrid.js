import React, { Component } from 'react';
import { connect } from "react-redux"
import * as AppActions from '../actions/appActions';
import "./ImageGrid.css";

class ImageGrid extends Component {
  expandImages = (index) => {
    this.props.dispatch(AppActions.displayImages(this.props.images, index));
  }

  createCell = (index, imageUrl, split) => {
    if (split > 1) {
      const extraClass = (index === 3 && this.props.images.length > 4) ? " ImageGrid-subImage--overflow" : "";
      return (
        <div className={"ImageGrid-subImage" + extraClass} onClick={this.expandImages.bind(this, index)}
          style={{
          position: "relative",
          display: "inline-flex",
          background: `url(${imageUrl}) no-repeat center /cover`,
          width: ((100 - split + 1) / split).toString() + 'vw',
          height: ((100 - split + 1) / split).toString() + 'vw',
        }}></div>
      );
    } else {
      return (
        <img onClick={this.expandImages.bind(this, index)} className="ImageGrid-main" src={imageUrl} alt="MainImage" />
      );
    }
  }

  renderOne() {
    return (
      <div className="ImageGrid">
        {this.createCell(0, this.props.images[0], 1)}
      </div>
    );
  }

  renderTwo() {
    return (
      <div className="ImageGrid">
        {this.createCell(0, this.props.images[0], 2)}
        {this.createCell(1, this.props.images[1], 2)}
      </div>
    );
  }

  renderThree() {
    return (
      <div className="ImageGrid ImageGrid--notTwo">
        {this.createCell(0, this.props.images[0], 1)}
        {this.createCell(1, this.props.images[1], 2)}
        {this.createCell(2, this.props.images[2], 2)}
      </div>
    );
  }

  renderFour() {
    return (
      <div className="ImageGrid ImageGrid--notTwo">
        {this.createCell(0, this.props.images[0], 1)}
        {this.createCell(1, this.props.images[1], 3)}
        {this.createCell(2, this.props.images[2], 3)}
        {this.createCell(3, this.props.images[3], 3)}
      </div>
    );
  }

  render() {
    switch(this.props.images.length) {
      case 1:
        return this.renderOne();
      case 2:
        return this.renderTwo();
      case 3:
        return this.renderThree();
      default:
        return this.renderFour();
    }
  }
}

export default connect()(ImageGrid);
