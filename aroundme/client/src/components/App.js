import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import { Page } from '../actions/appActions';
import MapView from './MapView';
import FormView from './FormView';
import './App.css';

const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const appId = appConfig[nodeEnv].appId;

/*global FB*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: appId,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          this.setState({
            fb_id: response.authResponse.userID,
          });
          localStorage.setItem('fb_id', response.authResponse.userID);
          this.loadCache();
          if (!this.state.id) {
            // TODO: call POST user from back end with
            // response.authResponse.userID
            // With result, set localstorage and state
          }
        } else {
          this.loadCache();
        }
      }.bind(this))
    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  renderBar() {
    return <AppBar
      title="AroundMe"
      titleStyle={{textAlign: "center"}}
      onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)}
      iconElementRight={<IconButton disabled={true}/>}
    />;
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleFBLogin(event) {
    event.preventDefault();

    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.api(response.authResponse.userID+"?fields=first_name,last_name,picture.width(58).height(58)", 'get', e=>{
          //TODO: call POST to back end with response.authResponse.userID and
          //other fields -> update state and localStorage
          this.setState({
            fb_id: response.authResponse.userID,
            first_name: e.first_name,
            last_name: e.last_name,
            pic_url: e.picture.data.url
          });
          localStorage.setItem('name', [e.first_name, e.last_name]);
          localStorage.setItem('pic_url', e.picture.data.url);
          localStorage.setItem('fb_id', response.authResponse.userID);
        })
      }
    }.bind(this), {scope: 'user_friends'});
  }

  loadCache() {
    let name = localStorage.getItem('name');
    name = name? name.split(',') : null;
    this.setState({
      id: localStorage.getItem('id'),
      fb_id: localStorage.getItem('fb_id'),
      first_name: name? name[0] : null,
      last_name: name? name[1] : null,
      pic_url: localStorage.getItem('pic_url')
    })
  }

  renderView() {
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />;
      default:
        return null;
    }
  }

  handleFBLogout(event) {
    event.preventDefault();
    this.setState({
      id: null,
      fb_id: null,
      first_name: null,
      last_name: null,
      pic_url: null,
    });
    localStorage.removeItem('name');
    localStorage.removeItem('pic_url');
    localStorage.removeItem('fb_id');
    localStorage.removeItem('id');
    FB.logout(function(response) {
      console.log(response);
    }.bind(this));
  }

  handleRequestChange() {
    this.setState({
      open: false
    })
  }

  render() {
    let menuTop = null;
    let menuBottom = null;
    let menuBottom2 = null;
    let menuBottom3 = null;
    let menuBottom4 = null;
    //TODO: change this to this.state.id once API call works
    if (this.state.fb_id) {
      menuTop =(<div className="Menu-Box">
                  <img className="Profile-Picture" src={this.state.pic_url}></img>
                  <div className="User-Information">
                    {this.state.first_name} {this.state.last_name}
                  </div>
                </div>);
      menuBottom = <MenuItem primaryText="My Events" /> 
      menuBottom2 = <MenuItem primaryText="Settings" />
      menuBottom3 = <MenuItem primaryText="Help &amp; feedback" />;
      menuBottom4 = <MenuItem primaryText="Sign out" onClick={this.handleFBLogout.bind(this)}/>
    } else {
      menuTop = <MenuItem 
                  style={{height:"80px",  
                          lineHeight:"80px", 
                          backgroundColor:"rgb(0,188,212)",
                          color: "white",
                          fontWeight: "bold",
                          textAlign:"center",
                          verticalAlign:"middle"}} 
                  primaryText="Log in"
                  onClick = {this.handleFBLogin.bind(this)}/>;
      menuBottom = <MenuItem primaryText="Help &amp; feedback" />;
    }
    return (
      <div className="App">
        {this.renderBar()}
        {this.renderView()}

        <MapView
          visible={this.props.page === Page.MAIN || this.props.page === Page.SELECT_LOCATION}
          selectMode={this.props.page === Page.SELECT_LOCATION}
          isDrawerOpen={this.state.open}
        />
        <Drawer 
          docked={false}
          onRequestChange={this.handleRequestChange.bind(this)}
          disableSwipeToOpen={true}
          open={this.state.open}>
          {menuTop}
          <Divider />
          {menuBottom}
          {menuBottom2}
          {menuBottom3}
          {menuBottom4}
        </Drawer>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page
  };
})(App);

