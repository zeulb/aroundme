import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { Page } from '../actions/appActions';
import * as AppActions from '../actions/appActions';
import MapView from './MapView';
import FormView from './FormView';
import SideDrawer from './SideDrawer';
import './App.css';

class App extends Component {
  renderBar() {
    return <AppBar
      title="AroundMe"
      titleStyle={{ textAlign: "center" }}
      onLeftIconButtonTouchTap={this.onOpenDrawer}
      iconElementRight={<IconButton disabled={true}/>}
    />;
  }

  onOpenDrawer = (event) => {
    event.preventDefault();
    this.props.dispatch(AppActions.openDrawer());
  };

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
        <SideDrawer />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page
  };
})(App);

