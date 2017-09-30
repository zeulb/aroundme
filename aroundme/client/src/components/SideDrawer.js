import React, { Component } from 'react';
import { connect } from "react-redux"
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import * as Icons from 'material-ui/svg-icons';
import * as AppActions from '../actions/appActions';
import UserCard from './UserCard';
import {indigo400} from 'material-ui/styles/colors';
import './SideDrawer.css';

/*global FB*/

class SideDrawer extends Component {
  handleFBLogin = (event) => {
    event.preventDefault();

    FB.login(response => {
      if (response.status === 'connected') {
        FB.api(
          response.authResponse.userID+"?fields=name,first_name,last_name,picture.width(800).height(800)",
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
    return (
      <UserCard
        isLoggedIn={this.props.isLoggedIn}
        user={this.props.user}
        onLogin={this.handleFBLogin}
      />
    );
  }

  onOpenPage = (page) => {
    this.props.dispatch(AppActions.switchPage(page));
  };

  renderMenu() {
    return this.props.isLoggedIn
      ? (
        <List>
          <ListItem
            primaryText="Discover Events"
            onClick={this.onOpenPage.bind(this, AppActions.Page.MAIN)}
            leftIcon={<Icons.ActionSearch color={indigo400} />}
          />
          <ListItem
            primaryText="Popular Events"
            onClick={this.onOpenPage.bind(this, AppActions.Page.POPULAR_FEED)}
            leftIcon={<Icons.SocialPerson color={indigo400} />}
          />
          <ListItem
            primaryText="My Profile"
            onClick={this.onOpenPage.bind(this, AppActions.Page.MY_FEED)}
            leftIcon={<Icons.SocialPerson color={indigo400} />}
          />
          <ListItem
            primaryText="Help"
            onClick={this.onOpenPage.bind(this, AppActions.Page.HELP)}
            leftIcon={<Icons.ActionInfo color={indigo400} />}
          />
        </List>
      )
      : (
        <List>
          <ListItem primaryText="Help" leftIcon={<Icons.ActionInfo color={indigo400} />} />
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

