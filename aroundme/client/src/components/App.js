import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import * as AppActions from '../actions/appActions'
import MapboxMap from './MapboxMap';
import ImageInput from './ImageInput';
import './App.css';

class App extends Component {

  onAddButtonClick = () => {
    this.imageInput.open()
      .then(image => {
        this.props.dispatch(AppActions.switchPage(AppActions.Page.ADD));
      });
  }

  addButtonImageInputRef = (input) => {
    this.imageInput = input;
  }

  renderBar() {
    return <AppBar
      title="AroundMe"
      showMenuIconButton={false}
      iconElementRight={<IconButton><ActionSettings /></IconButton>}
    />;
  }

  renderAddButton() {
    return (
      <FloatingActionButton
        className="App-addButton"
        onClick={this.onAddButtonClick}>
        <ContentAdd />
        <ImageInput ref={this.addButtonImageInputRef} />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderBar()}
        {this.renderAddButton()}
        <MapboxMap />
      </div>
    );
  }
}

export default connect((store) => {
  return {};
})(App);
