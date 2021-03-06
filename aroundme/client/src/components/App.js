import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import { Page } from '../actions/appActions';
import * as AppActions from '../actions/appActions';
import * as FormActions from '../actions/formActions';
import * as Icons from 'material-ui/svg-icons';
import MapView from './MapView';
import FormView from './FormView';
import LoginView from './LoginView';
import MapFeedView from './MapFeedView';
import PopularFeedView from './PopularFeedView';
import MyFeedView from './MyFeedView';
import ImageView from './ImageView';
import SideDrawer from './SideDrawer';
import Logo from '../assets/logo.png';
import './App.css';
import HelpView from './HelpView';
import Joyride from 'react-joyride';

const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

class App extends Component {
  onboardingSteps = [
    {
      title: 'Welcome to Around',
      text: 'Discover and share interesting events that are happening around you!',
      selector: '.App-bar',
      position: 'bottom',
      type: 'click',
      isFixed: false,
      style: {
        mainColor: '#7D68A2',
        arrow: {
          display: 'none'
        },
        close: {
          display: 'none'
        },
        hole: {
          marginTop: '-5px'
        }
      }
    },
    {
      title: 'Map Overview',
      text: 'Swipe to shift visible map area, or pinch to zoom in and out.',
      selector: '.MapboxMap-overview',
      position: 'bottom',
      type: 'click',
      isFixed: false,
      style: {
        mainColor: '#7D68A2',
        arrow: {
          display: 'none'
        },
        close: {
          display: 'none'
        },
      }
    },
    {
      title: 'What\'s going on?',
      text: 'Check out what\'s happening at a location by clicking on the marker!',
      selector: '.MapboxMap-onboardingMarker',
      position: 'top',
      type: 'click',
      isFixed: false,
      style: {
        mainColor: '#7D68A2',
        arrow: {
          display: 'none'
        },
        close: {
          display: 'none'
        }
      }
    },
    {
      title: 'See something interesting?',
      text: 'Let us know what\'s happening around you now by adding an event!',
      selector: '.AddButton > div:nth-child(3)',
      position: 'top left',
      type: 'click',
      isFixed: false,
      style: {
        mainColor: '#7D68A2',
        arrow: {
          display: 'none'
        },
        close: {
          display: 'none'
        }
      }
    },
  ]

  componentDidUpdate(prevProps, prevState) {
    if (this.props.runQueue
      && this.props.createQueue
      && this.props.createQueue.length > 0
      && (!prevProps.createQueue
          || this.props.createQueue.length !== prevProps.createQueue.length
          || this.props.runQueue !== prevProps.runQueue)) {
      const formData = this.props.createQueue[0];
      const interval =
        setInterval(() =>
          fetch(apiUrl + "/events", {
            method: "POST",
            body: formData
          })
            .then(() => {
              clearInterval(interval);
              this.props.dispatch(FormActions.popCreateQueue());
            })
            .catch(() => {}), 3000);
    }
  }

  renderLogo() {
    return <img className="App-logo" src={Logo} alt="logo" />;
  }

  onClose = () => {
    if (this.props.feedExpandedEvent) {
      this.props.dispatch(AppActions.collapseEvent());
    } else {
      this.props.dispatch(AppActions.switchPage(Page.MAIN));
    }
  }

  renderBar() {
    const appBarText = this.appBar();
    if (appBarText === 'Home') {
      return <AppBar
        className="App-bar"
        title={this.renderLogo()}
        titleStyle={{ textAlign: "center" }}
        onLeftIconButtonTouchTap={this.onOpenDrawer}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else if (appBarText === 'Feed') {
      return <AppBar
        className="App-bar"
        title={this.renderLogo()}
        titleStyle={{ textAlign: "center" }}
        iconElementLeft={<IconButton><Icons.NavigationChevronLeft /></IconButton>}
        onLeftIconButtonTouchTap={this.onClose}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else if (appBarText && this.isFeedView() && this.props.feedExpandedEvent) {
      return <AppBar
        className="App-bar"
        title={this.getAppText(appBarText)}
        titleStyle={{ textAlign: "center", fontSize: 'large' }}
        iconElementLeft={<IconButton><Icons.NavigationChevronLeft /></IconButton>}
        onLeftIconButtonTouchTap={this.onClose}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else if (appBarText) {
      return <AppBar
        className="App-bar"
        title={this.getAppText(appBarText)}
        titleStyle={{ textAlign: "center", fontSize: 'large' }}
        onLeftIconButtonTouchTap={this.onOpenDrawer}
        iconElementRight={<IconButton disabled={true}/>}
      />;
    } else {
      return null;
    }
  }

  getAppText(text) {
    if (text === 'My Profile') {
      if (!this.props.profileUser || this.props.user.id === this.props.profileUser.id) {
        return text;
      } else {
        return `${this.props.profileUser.name}'s Profile`;
      }
    } else {
      return text
    }
  }

  onOpenDrawer = (event) => {
    event.preventDefault();
    this.props.dispatch(AppActions.openDrawer());
  };

  getFeedEvents() {
    return this.props.events.filter(event => (this.props.feedEvents.indexOf(event.id) !== -1) && ((Date.now() - event.timestamp) <= (3 * 24 * 60 * 60 * 1000)));
  }

  getPopularEvents() {
    return this.props.events.filter(event => (Date.now() - event.timestamp) <= (3 * 24 * 60 * 60 * 1000));
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
        return <MapFeedView displayImages={(this.props.images.length > 0)} events={this.getFeedEvents()} />;
      case Page.MY_FEED:
        return <MyFeedView displayImages={(this.props.images.length > 0)} events={this.props.events}/>;
      case Page.POPULAR_FEED:
        return <PopularFeedView displayImages={(this.props.images.length > 0)} events={this.getPopularEvents()}/>;
      case Page.HELP:
        return <HelpView />;
      default:
        return null;
    }
  }

  isFeedView() {
    switch(this.props.page) {
      case Page.MAP_FEED:
      case Page.MY_FEED:
      case Page.POPULAR_FEED:
        return true;
      default:
        return false;
    }
  }

  appBar() {
    if (this.props.images.length > 0) {
      return null;
    }
    switch(this.props.page) {
      case Page.SELECT_LOCATION:
      case Page.ADD:
      case Page.LOGIN:
      case Page.SPLASH:
        return null;
      case Page.MAP_FEED:
        return "Feed";
      case Page.MY_FEED:
        return "My Profile";
      case Page.POPULAR_FEED:
        return "Popular";
      default:
        return "Home";
    }
  }

  setNotRecentlyLoggedIn = () => {
    this.props.dispatch(AppActions.setNotRecentlyLoggedIn());
  }

  renderMap() {
    if (this.props.page !== Page.SPLASH) {
      return (
        <MapView
          withAppBar={this.appBar() !== null}
          visible={this.props.page === Page.MAIN || this.props.page === Page.SELECT_LOCATION}
          selectMode={this.props.page === Page.SELECT_LOCATION}
        />
      );
    } else {
      return null;
    }
  }

  renderImages() {
    if (this.props.images.length > 0) {
      return <ImageView images={this.props.images} startImageIndex={this.props.startImageIndex} />;
    } else {
      return null;
    }
  }

  handleJoyrideCallback = (result) => {
    if (result.type === 'finished') {
      this.props.dispatch(AppActions.onboardingDone());
    }
  }

  renderOnboarding() {
    if (this.props.page === Page.MAIN && this.props.mapReady) {
      return (
        <Joyride
          ref="joyride"
          steps={this.onboardingSteps}
          run={this.props.onboarding}
          debug={false}
          callback={this.handleJoyrideCallback}
          showOverlay={true}
          showBackButton={true}
          type={'continuous'}
          scrollToSteps={false}
          disableOverlay={true}
          autoStart={true}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="App" className="App" style={{
        overflowY: "hidden"
      }}>
        {this.renderOnboarding()}
        <Snackbar
          open={this.props.recentlyLoggedIn}
          message={this.props.user.firstTime? `Welcome, ${this.props.user.firstName}!`: `Welcome back, ${this.props.user.firstName}!`}
          autoHideDuration={1500}
          onRequestClose={this.setNotRecentlyLoggedIn}
        />

        {this.renderBar()}
        {this.renderView()}
        {this.renderImages()}
        {this.renderMap()}
        <SideDrawer />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    mapReady: store.app.mapReady,
    page: store.app.page,
    user: store.app.user,
    onboarding: store.app.onboarding,
    images: store.app.images,
    startImageIndex: store.app.startImageIndex,
    profileUser: store.app.pageArg.profileUser,
    feedExpandedEvent: store.app.feedExpandedEvent,
    runQueue: store.form.runQueue,
    createQueue: store.form.createQueue,
    events: store.map.events,
    feedEvents: store.app.pageArg.feedEvents,
    recentlyLoggedIn: store.app.recentlyLoggedIn
  };
})(App);

