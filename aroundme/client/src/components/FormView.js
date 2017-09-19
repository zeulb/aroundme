import React, { Component } from 'react';
import { connect } from "react-redux";
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import * as AppActions from '../actions/appActions';
import * as FormActions from '../actions/formActions';
import ImageSlider from './ImageSlider';
import FormRow from './FormRow';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import "./FormView.css";

class FormView extends Component {
  renderImages() {
    return <ImageSlider images={this.props.images} />;
  }

  onCloseButtonClick = () => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAIN));
    this.props.dispatch(FormActions.resetForm());
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
        <FormRow />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    images: store.form.images
  };
})(FormView);
