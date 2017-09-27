import React, { Component } from 'react';
import "./ImageInput.css";

class ImageInput extends Component {
  state = {
    imagesUploaded: null,
    waiting: true,
    promiseResolve: null,
    promiseReject: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.waiting !== this.state.waiting) {
      if (this.state.imagesUploaded) {
        this.state.promiseResolve(this.state.imagesUploaded);
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
      imagesUploaded: null,
      waiting: true
    });
  }

  inputRef = (input) => {
    this.input = input;
  }

  onImageSelect = (event) => {
    var promises = [].slice.call(event.target.files).map(file =>
      new Promise((resolve, reject) => {
        if (file) {
          var reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              file: file,
              type: file.type,
              image: reader.result
            });
          }

          reader.onerror = () => {
            reject();
          }

          reader.readAsDataURL(file);
        } else {
          reject();
        }
      })
    );

    Promise.all(promises)
      .then(images => {
        this.setState({
          imagesUploaded: images,
          waiting: false
        });
      })
      .catch(() => {
        this.setState({
          imagesUploaded: null,
          waiting: false
        });
      });
  }

  render() {
    return (
      <input
        className="ImageInput"
        ref={this.inputRef}
        onChange={this.onImageSelect}
        type="file"
        accept="image/*,video/mp4" />
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
