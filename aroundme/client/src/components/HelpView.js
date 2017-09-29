import React, { Component } from 'react';
import { connect } from "react-redux";
import * as Icons from 'material-ui/svg-icons';
import "./HelpView.css";

class HelpView extends Component {
  render() {
    return (
      <div>
        <div className="Title">How does Around work?</div>
        <div className="Content"> 
          See something interesting around you? Snap it and upload it on your feed! Or explore whats going on in your area with "Discover Events"! </div>
        <div className="Title">
          I see an interesting event! How do I share it on Around?
        </div>
        <div className="Content">
          <div className="Content-Inner">1. Select "Discover Events" from the menu.</div>
          <div className="Content-Inner">2. Select <svg viewBox="0 0 24 24" className="Add-Icon"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg> at the bottom left of your screen.</div>
          <div className="Content-Inner">3. Choose <Icons.ImagePhotoCamera className="Other-Icon"/> to snap a shot or choose <Icons.ImagePhotoLibrary className="Other-Icon"/> to upload existing photos.</div>
          <div className="Content-Inner">4. Drag the pin to where the photo was taken.</div>
          <div className="Content-Inner">5. Select <Icons.ContentSend className="Other-Icon"/> to upload.</div>
        </div>
      </div>)
  }
}

export default connect()(HelpView);
