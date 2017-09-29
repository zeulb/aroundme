import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Icons from 'material-ui/svg-icons';
import "./HelpView.css";

class HelpView extends Component {
  render() {
    return (
      <div>
        <div className="Title">How does "AroundMe" work?</div>
        <div className="Content"> 
          See something interesting around you? Snap it and upload it on your feed! Or explore whats going on in your area with "Discover Events"! </div>
        <div className="Title">
          See something interesting and want to share it?
        </div>
        <div className="Content">
          <div className="Content-Inner">1. Select <svg viewBox="0 0 24 24" className="Add-Icon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> at the bottom right of your screen in "Discover Events".</div>
          <div className="Content-Inner">2. Choose <Icons.ImagePhotoCamera/> to snap a shot or choose <Icons.ImagePhotoLibrary /> to upload existing photos.</div>
          <div className="Content-Inner">3. Drag the pin to where the photo was taken.</div>
          <div className="Content-Inner">4. Select <Icons.ContentSend /> to upload.</div>
        </div>
      </div>)
  }
}

export default connect()(HelpView);
