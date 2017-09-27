import React, { Component } from 'react';
import { connect } from "react-redux"
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import * as Icons from 'material-ui/svg-icons';
import MenuItem from 'material-ui/MenuItem';
import * as AppActions from '../actions/appActions';
import {indigo400} from 'material-ui/styles/colors';
import './SideDrawer.css';

const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const appId = appConfig[nodeEnv].appId;

/*global FB*/

class SideDrawer extends Component {
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

  handleFBLogin = (event) => {
    event.preventDefault();

    FB.login(response => {
      if (response.status === 'connected') {
        FB.api(
          response.authResponse.userID+"?fields=name,first_name,last_name,picture.width(58).height(58)",
          'get',
          e => {
            this.props.dispatch(
              AppActions.login({
                facebookId: response.authResponse.userID,
                accessToken: response.authResponse.accessToken,
                fullName: e.name,
                firstName: e.first_name,
                lastName: e.last_name,
                pictureUrl: e.picture.data.url
              })
            );
          })
      }
    }, {
      scope: 'user_friends'
    });
  }

  handleFBLogout = (event) => {
    event.preventDefault();
    FB.logout(response => {
      this.props.dispatch(AppActions.logout());
    });
  }

  onDrawerClose = () => {
    this.props.dispatch(AppActions.closeDrawer());
  }

  renderHeader() {
    return this.props.isLoggedIn ? (
        <div className="SideDrawer-loggedInHeader">
          <img className="SideDrawer-profilePicture" src={this.props.user.pictureUrl} alt={this.props.user.fullName} />
          <div className="SideDrawer-userInformation">
            {this.props.user.fullName}
          </div>
        </div>
      ) : (
        <MenuItem 
          className="SideDrawer-guestHeader"
          primaryText="Log in"
          onClick = {this.handleFBLogin}
        />
      );
  }

  renderMenu() {
    return this.props.isLoggedIn
      ? (
        <List>
          <ListItem primaryText="Discover Events" leftIcon={<Icons.ActionSearch color={indigo400} />} />
          <ListItem primaryText="My Feed" leftIcon={<Icons.SocialPerson color={indigo400} />} />
          <ListItem primaryText="Help / Privacy" leftIcon={<Icons.ActionInfo color={indigo400} />} />
          <ListItem primaryText="Settings" leftIcon={<Icons.ActionSettings color={indigo400} />} />
        </List>
      )
      : (
        <List>
          <ListItem primaryText="Help / Privacy" leftIcon={<Icons.ActionInfo color={indigo400} />} />
        </List>
      );
  }

  renderLogOut() {
    return (
      <List className="SideDrawer-logOutContainer">
        <ListItem
          className="SideDrawer-logOut"
          primaryText="Log Out?"
          onClick={this.handleFBLogout}
          insetChildren={true}
        />
      </List>
    );
  }

  render() {
    return (
      <Drawer
        className="SideDrawer"
        docked={false}
        onRequestChange={this.onDrawerClose}
        disableSwipeToOpen={true}
        open={this.props.isOpen}>
        {this.renderHeader()}
        <Divider />
        {this.renderMenu()}
        {this.props.isLoggedIn ? this.renderLogOut(): null}
      </Drawer>
    );
  }
}

export default connect((store) => {
  return {
    user: store.app.user,
    isLoggedIn: store.app.isLoggedIn,
    isOpen: store.app.drawerOpen
  };
})(SideDrawer);

