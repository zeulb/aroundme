import React, { Component } from 'react';
import { connect } from "react-redux"
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import * as FormActions from '../actions/formActions';
import * as MapActions from '../actions/mapActions';
import * as AppActions from '../actions/appActions';
import "./MapView.css";

class MapView extends Component {

  onSend = () => {
    if (this.props.isLoggedIn) {
      this.props.dispatch(FormActions.createEvent());
      this.props.dispatch(MapActions.addEventFromForm());
      this.props.dispatch(AppActions.switchPage(AppActions.Page.MAIN));
      this.props.dispatch(FormActions.resetForm());
    } else {
      this.props.dispatch(AppActions.switchPage(AppActions.Page.LOGIN));
    }
  };

  resetForm = () => {
    this.props.dispatch(FormActions.resetForm());
  }

  renderSendButton() {
    return (
      <FloatingActionButton
        className="MapView-sendButton"
        onClick={this.onSend}
        mini
        secondary>
        <Icons.ContentSend />
      </FloatingActionButton>
    );
  }

  className() {
    return "MapView" + (
      this.props.withAppBar ? " MapView--withAppBar" : ""
    );
  }

  renderGuide() {
    return (
      <div className="MapView-guide">
        Drag the pin to the location where the photo is taken.
      </div>
    );
  }

  render() {
    return (
      <div className={this.className()} style={{visibility: this.props.visible ? "visible" : "hidden"}}>
        <Snackbar
          open={this.props.recentlyCreated}
          message={"You just created an event!"}
          autoHideDuration={2500}
          onRequestClose={this.resetForm}
        />
        {this.props.selectMode ? this.renderGuide() : null}
        {(this.props.visible && !this.props.selectMode) ? <AddButton returnPage={AppActions.Page.MAIN} /> : null}
        {(this.props.visible && this.props.selectMode) ? this.renderSendButton() : null}
        <MapboxMap selectMode={this.props.selectMode} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    isLoggedIn: store.app.isLoggedIn,
    recentlyCreated: store.form.created
  };
})(MapView);
