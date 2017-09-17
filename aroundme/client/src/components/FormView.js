import React, { Component } from 'react';
import { connect } from "react-redux";
import "./FormView.css";

class FormView extends Component {
  renderImages() {
    return this.props.images.map(image => {
      return <img src={image} />;
    });
  }

  render() {
    return (
      <div className="FormView">
        {this.renderImages()}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    images: store.form.images
  };
})(FormView);
