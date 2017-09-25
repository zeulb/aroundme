import React, { Component } from 'react';
import { connect } from "react-redux"
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import * as FormActions from '../actions/formActions';
import * as AppActions from '../actions/appActions';
import "./MapView.css";

class MapView extends Component {

  onSend = () => {
    this.props.dispatch(FormActions.createEvent());
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAIN));
    this.props.dispatch(FormActions.resetForm());
  };

  resetForm = () => {
    this.props.dispatch(FormActions.resetForm());
  }

  renderSendButton() {
    return (
      <FloatingActionButton
        className="MapView-sendButton"
        onClick={this.onSend}>
        <Icons.ContentSend />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <div className="MapView" style={{visibility: this.props.visible ? "visible" : "hidden"}}>
        <Snackbar
          open={this.props.recentlyCreated}
          message={"You just created an event!"}
          autoHideDuration={2500}
          onRequestClose={this.resetForm}
        />
        {(this.props.visible && !this.props.selectMode) ? <AddButton /> : null}
        {(this.props.visible && this.props.selectMode) ? this.renderSendButton() : null}
        <MapboxMap selectMode={this.props.selectMode} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    recentlyCreated: store.form.created
  };
})(MapView);
