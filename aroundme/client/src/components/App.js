import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Page } from '../actions/appActions';
import * as AppActions from '../actions/appActions';
import * as Icons from 'material-ui/svg-icons';
import MapView from './MapView';
import FormView from './FormView';
import LoginView from './LoginView';
import MapFeedView from './MapFeedView';
import MyFeedView from './MyFeedView';
import ImageView from './ImageView';
import SideDrawer from './SideDrawer';
import Logo from '../assets/logo.png';
import './App.css';
import HelpView from './HelpView';

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

  onClose = () => {
    this.props.dispatch(AppActions.switchPage(Page.MAIN));
  }

  renderBar() {
    const appBarText = this.appBar();
    if (appBarText === 'Home') {
      return <AppBar
        title={this.renderLogo()}
        titleStyle={{ textAlign: "center" }}
        onLeftIconButtonTouchTap={this.onOpenDrawer}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else if (appBarText === 'Feed') {
      return <AppBar
        title={this.renderLogo()}
        titleStyle={{ textAlign: "center" }}
        iconElementLeft={<IconButton><Icons.NavigationChevronLeft /></IconButton>}
        onLeftIconButtonTouchTap={this.onClose}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else if (appBarText) {
      return <AppBar
        title={appBarText}
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

  getFeedEvents() {
    return this.props.events.filter(event => (this.props.feedEvents.indexOf(event.id) !== -1));
  }

  renderView() {
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />;
      case Page.LOGIN:
        return <LoginView splash={false} returnPage={Page.SELECT_LOCATION} />;
      case Page.SPLASH:
        return <LoginView splash={true} returnPage={Page.MAIN} />;
      case Page.MAP_FEED:
        return <MapFeedView events={this.getFeedEvents()} />;
      case Page.MY_FEED:
        return <MyFeedView events={this.props.events} />;
      case Page.HELP:
        return <HelpView />;
      case Page.IMAGE:
        return <ImageView />;
      default:
        return null;
    }
  }

  renderMap() {
    switch(this.props.page) {
      case Page.SPLASH:
        return null;
      default:
        return (
            <MapView
              withAppBar={this.appBar() !== null}
              visible={this.props.page === Page.MAIN || this.props.page === Page.SELECT_LOCATION}
              selectMode={this.props.page === Page.SELECT_LOCATION}
            />);

    }
  }

  isFeedView() {
    switch(this.props.page) {
      case Page.MAP_FEED:
        return true;
      default:
        return false;
    }
  }

  appBar() {
    switch(this.props.page) {
      case Page.SELECT_LOCATION:
      case Page.ADD:
      case Page.LOGIN:
      case Page.SPLASH:
      case Page.IMAGE:
        return null;
      case Page.MAP_FEED:
        return "Feed";
      case Page.MY_FEED:
        return "My Feeds";
      default:
        return "Home";
    }
  }

  setNotRecentlyLoggedIn = () => {
    this.props.dispatch(AppActions.setNotRecentlyLoggedIn());
  }

  render() {
    return (
      <div className="App" style={{
        overflowY: "hidden"
      }}>
        <Snackbar
          open={this.props.recentlyLoggedIn}
          message={`Welcome back, ${this.props.user.firstName}!`}
          autoHideDuration={1500}
          onRequestClose={this.setNotRecentlyLoggedIn}
        />

        {this.renderBar()}
        {this.renderView()}
        {this.renderMap()}

        <SideDrawer />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page,
    user: store.app.user,
    events: store.map.events,
    feedEvents: store.app.pageArg.feedEvents,
    recentlyLoggedIn: store.app.recentlyLoggedIn
  };
})(App);

