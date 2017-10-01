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
  state = {
    currentIndex: 0
  }

  renderImages() {
    return <ImageSlider images={this.props.images} onChangeIndex={this.onChangeIndex} />;
  }

  onCloseButtonClick = () => {
    this.props.dispatch(AppActions.switchPage(this.props.returnPage));
    this.props.dispatch(FormActions.resetForm());
  };

  onChangeIndex = (index) => {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    return (
      <div className="FormView">
        <IconButton className="FormView-closeButton" onClick={this.onCloseButtonClick} >
          <NavigationClose color={white}/>
        </IconButton>
        <div className="FormView-count">
          {this.state.currentIndex + 1} of {this.props.images.length}
        </div>
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
    images: store.form.images,
    returnPage: store.app.pageArg.returnPage
  };
})(FormView);
