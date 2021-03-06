import React, { Component } from 'react';
import { connect } from "react-redux"
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import * as Icons from 'material-ui/svg-icons';
import * as FormActions from '../actions/formActions';
import * as MapActions from '../actions/mapActions';
import * as AppActions from '../actions/appActions';
import MarkerImage from '../assets/Mapmarker.svg';
import "./MapView.css";

const { token } = require('../config/mapbox.json');

class MapView extends Component {
  state = {
    address: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.lng},${this.props.location.lat}.json?access_token=${token}&types=address`;

        fetch(url)
          .then(r => r.json())
          .then(r => {
            if (r.features.length > 0) {
              this.setState({
                address: r.features[0].place_name
              });
            } else {
              this.setState({
                address: ''
              });
            }
          });
      } else {
        this.setState({
          address: ''
        });
      }
    }
  }

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

  renderCurrentLocation() {
    return (
      <Paper className="MapView-currentLocation" zDepth={3}>
        <img className="MapView-currentLocationMarker" src={MarkerImage} alt="MarkerImage" />
        <span className="MapView-address">
          {this.state.address}
        </span>
      </Paper>
    )
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
        {this.props.selectMode ? this.renderCurrentLocation() : null}
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
    location: store.form.location,
    isLoggedIn: store.app.isLoggedIn,
    recentlyCreated: store.form.created
  };
})(MapView);
