import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { Page } from '../actions/appActions';
import MapView from './MapView';
import FormView from './FormView';
import './App.css';

class App extends Component {
  renderBar() {
    return <AppBar
      title="AroundMe"
      showMenuIconButton={false}
      iconElementRight={<IconButton><ActionSettings /></IconButton>}
    />;
  }

  renderView() {
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderBar()}
        {this.renderView()}

        <MapView
          visible={this.props.page === Page.MAIN || this.props.page === Page.SELECT_LOCATION}
          selectMode={this.props.page === Page.SELECT_LOCATION}
        />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page
  };
})(App);
