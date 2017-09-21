import React, { Component } from 'react';
import { connect } from "react-redux"
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import * as AppActions from '../actions/appActions';
import "./MapView.css";

class MapView extends Component {

  onSend = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAIN));
  };

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
        {(this.props.visible && !this.props.selectMode) ? <AddButton /> : null}
        {(this.props.visible && this.props.selectMode) ? this.renderSendButton() : null}
        <MapboxMap selectMode={this.props.selectMode} />
      </div>
    );
  }
}

export default connect()(MapView);
