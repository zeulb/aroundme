import React, { Component } from 'react';
import { connect } from "react-redux";
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import * as AppActions from '../actions/appActions';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import "./FormView.css";

class FormView extends Component {
  renderImages() {
    return this.props.images.map(image => {
      return <img className="FormView-image" src={image} />;
    });
  }

  onCloseButtonClick = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAIN));
  };

  render() {
    return (
      <div className="FormView">
        <IconButton className="FormView-closeButton" onClick={this.onCloseButtonClick} >
          <NavigationClose color={white}/>
        </IconButton>
        <div className="FormView-images">
          {this.renderImages()}
        </div>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    images: store.form.images
  };
})(FormView);
