import React, { Component } from 'react';
import "./ImageInput.css";

class ImageInput extends Component {
  state = {
    imageUploaded: null,
    waiting: true,
    promiseResolve: null,
    promiseReject: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.waiting !== this.state.waiting) {
      if (this.state.imageUploaded) {
        this.state.promiseResolve(this.state.imageUploaded);
      } else {
        this.state.promiseReject();
      }
    }
  }

  inputRef = (input) => {
    this.input = input;
  }

  onImageSelect = (event) => {
    var file = event.target.files[0];

    if (file && /^image\//i.test(file.type)) {
      this.setState({
        imageUploaded: file,
        waiting: false
      });
    } else {
      this.setState({
        waiting: false
      });
    }
  }

  render() {
    return (
      <input
        className="ImageInput"
        ref={this.inputRef}
        onChange={this.onImageSelect}
        type="file"
        accept="image/*" />
    );
  }

  open() {
    this.input.click();
    return new Promise((resolve, reject) => {
      this.setState({
        promiseResolve: resolve,
        promiseReject: reject
      });
    });
  }
}

export default ImageInput;
