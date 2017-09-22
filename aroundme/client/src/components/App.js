import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { Page } from '../actions/appActions';
import MapView from './MapView';
import FormView from './FormView';
import './App.css';

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
        appId: '1429723593764167',
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          FB.login(function(response) {
            if (response.status === 'connected') {
              FB.api(response.authResponse.userID+"?fields=first_name,last_name,picture.width(58).height(58)", 'get', e=>{
                this.setState({
                  id: response.authResponse.userID,
                  access_token: response.authResponse.accessToken,
                  first_name: e.first_name,
                  last_name: e.last_name,
                  pic_url: e.picture.data.url
                });
                localStorage.setItem('name', [e.first_name, e.last_name]);
                localStorage.setItem('pic_url', e.picture.data.url);
                localStorage.setItem('me_id', response.authResponse.userID);
                localStorage.setItem('me_access_token', response.authResponse.accessToken);
              })
            }
          }.bind(this), {scope: 'user_friends'});
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
          this.setState({
            id: response.authResponse.userID,
            access_token: response.authResponse.accessToken,
            first_name: e.first_name,
            last_name: e.last_name,
            pic_url: e.picture.data.url
          });
          localStorage.setItem('name', [e.first_name, e.last_name]);
          localStorage.setItem('pic_url', e.picture.data.url);
          localStorage.setItem('me_id', response.authResponse.userID);
          localStorage.setItem('me_access_token', response.authResponse.accessToken);
        })
      }
    }.bind(this), {scope: 'user_friends'});
  }

  loadFromCache() {
    let name = localStorage.getItem('name');
    name = name? name.split(',') : null;
    return {
      id: localStorage.getItem('me_id'),
      access_token: localStorage.getItem('me_access_token'),
      first_name: name? name[0] : null,
      last_name: name? name[1] : null,
      pic_url: localStorage.getItem('pic_url')
    };
  }

  renderView() {
    switch(this.props.page) {
      case Page.ADD:
        return <FormView />;
      default:
        return null;
    }
  }

  handleRequestChange() {
    this.setState({
      open: false
    })
  }

  render() {
    let cache = this.loadFromCache();
    let menuTop = null;
    let menuBottom = null;
    let menuBottom2 = null;
    let menuBottom3 = null;
    console.log(cache);
    if (this.state.access_token) {
      menuTop = <div className="Menu-Text">Welcome, {this.state.first_name}!</div>
      menuBottom = <MenuItem primaryText="My Events" /> 
      menuBottom2 = <MenuItem primaryText="Settings" />
      menuBottom3 = <MenuItem primaryText="Sign out" />
    } else {
      menuTop = <MenuItem 
                  style={{"height":"64px",  
                          "line-height":"64px", 
                          backgroundColor:"rgb(0,188,212)",
                          "color": "white",
                          "font-weight": "bold",
                          "text-align":"center",
                          "vertical-align":"middle"}} 
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
        />
        <Drawer 
          docked={false}
          onRequestChange={this.handleRequestChange.bind(this)}
          open={this.state.open}>
          {menuTop}
          <Divider />
          {menuBottom}
          {menuBottom2}
          {menuBottom3}
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

