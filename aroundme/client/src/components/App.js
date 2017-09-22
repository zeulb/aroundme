import React, { Component } from 'react';
import { connect } from "react-redux"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
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
      me: null,
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
          this.setState({
            me: {
              id: response.authResponse.userID,
              access_token: response.authResponse.accessToken
            }
          })
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
      showMenuIconButton={false}
      iconElementRight={<IconButton 
                            onTouchTap={this.handleTouchTap.bind(this)}>
                            <ActionSettings/>
                          </IconButton>}
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

  handleFBLogin(e) {
    console.log(this.state)
    FB.login(function(response) {
      if (response.status === 'connected') {
        this.setState({
          me: {
            id: response.authResponse.userID,
            access_token: response.authResponse.accessToken
          }
        })
        FB.api(response.authResponse.userID+"?fields=email,first_name,last_name,name,gender", 'get', e=>{
          console.log(e);
          })
      }
    }.bind(this), {scope: 'user_friends'});
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
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          onRequestClose={this.handleRequestClose.bind(this)}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}>

          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default connect((store) => {
  return {
    page: store.app.page
  };
})(App);
