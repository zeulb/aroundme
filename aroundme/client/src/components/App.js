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
    console.log(this.props.page);
    console.log(Page.ADD);
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />
      default:
        return <MapView />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderBar()}
        {this.renderView()}
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page
  };
})(App);
