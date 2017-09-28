import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Page } from '../actions/appActions';
import * as AppActions from '../actions/appActions';
import MapView from './MapView';
import FormView from './FormView';
import LoginView from './LoginView';
import SideDrawer from './SideDrawer';
import Logo from '../assets/logo.png';
import './App.css';

const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const appId = appConfig[nodeEnv].appId;

/*global FB*/

class App extends Component {

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
      FB.getLoginStatus(response => {
        if (response.status !== 'connected') {
          // Clear cache & set as not logged in
          this.props.dispatch(AppActions.logout());
        }
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  renderLogo() {
    return <img className="App-logo" src={Logo} alt="logo" />;
  }

  renderBar() {
    if (this.shouldRenderAppBar()) {
      return <AppBar
        title={this.renderLogo()}
        titleStyle={{ textAlign: "center" }}
        onLeftIconButtonTouchTap={this.onOpenDrawer}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else {
      return null;
    }
  }

  onOpenDrawer = (event) => {
    event.preventDefault();
    this.props.dispatch(AppActions.openDrawer());
  };

  renderView() {
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />;
      case Page.LOGIN:
        return <LoginView splash={false} returnPage={Page.SELECT_LOCATION} />;
      case Page.SPLASH:
        return <LoginView splash={true} returnPage={Page.MAIN} />;
      default:
        return null;
    }
  }

  shouldRenderAppBar() {
    return (this.props.page !== Page.SELECT_LOCATION && this.props.page !== Page.ADD && this.props.page !== Page.LOGIN && this.props.page !== Page.SPLASH);
  }

  setNotRecentlyLoggedIn = () => {
    this.props.dispatch(AppActions.setNotRecentlyLoggedIn());
  }

  render() {
    return (
      <div className="App">
        <Snackbar
          open={this.props.recentlyLoggedIn}
          message={`Welcome back, ${this.props.user.firstName}!`}
          autoHideDuration={1500}
          onRequestClose={this.setNotRecentlyLoggedIn}
        />

        {this.renderBar()}
        {this.renderView()}

        <MapView
          withAppBar={this.shouldRenderAppBar()}
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
    page: store.app.page,
    user: store.app.user,
    recentlyLoggedIn: store.app.recentlyLoggedIn
  };
})(App);

