import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Icons from 'material-ui/svg-icons';
import "./HelpView.css";

class HelpView extends Component {
  render() {
    return (
      <div>
        <div className="Title">How it works?</div>
        <div className="Content"> See an interesting event or news around you? 
Snap it and upload it on your feed! 
Looking for an event around your location? 
Discover events by exploring events that were
uploaded by other people in your area! </div>
        <div className="Title">How to upload an event?</div>
        <div className="Content">
          <div className="Content-Inner">1. Select <svg viewBox="0 0 24 24" className="Add-Icon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>.</div>
          <div className="Content-Inner">2. Select <Icons.ImagePhotoCamera/> to snap a shot. Select <Icons.ImagePhotoLibrary /> to upload photos.</div>
          <div className="Content-Inner">3. Drag the pin to where the photo was taken.</div>
          <div className="Content-Inner">4. Select <Icons.ContentSend /> to upload.</div>
        </div>
      </div>)
  }
}

export default connect()(HelpView);
