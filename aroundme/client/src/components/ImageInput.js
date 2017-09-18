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

      this.reset();
    }
  }

  reset() {
    this.input.removeAttribute("capture");
    this.input.removeAttribute("multiple");
    this.setState({
      imageUploaded: null,
      waiting: true
    });
  }

  inputRef = (input) => {
    this.input = input;
  }

  onImageSelect = (event) => {
    var file = event.target.files[0];

    if (file && /^image\//i.test(file.type)) {
      var reader = new FileReader();

      reader.onloadend = () => {
        this.setState({
          imageUploaded: reader.result,
          waiting: false
        });
      }

      reader.onerror = () => {
        this.setState({
          waiting: false
        });
      }

      reader.readAsDataURL(file);
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

  createPromise() {
    return new Promise((resolve, reject) => {
      this.setState({
        promiseResolve: resolve,
        promiseReject: reject
      });
    });
  }

  openCamera() {
    this.input.setAttribute("capture", "camera");
    this.input.click();
    return this.createPromise();
  }

  openPhotoLibrary() {
    this.input.setAttribute("multiple", "");
    this.input.click();
    return this.createPromise();
  }
}

export default ImageInput;
