import React, { Component } from 'react';
import { connect } from "react-redux";
import IconButton from 'material-ui/IconButton';
import {white} from 'material-ui/styles/colors';
import * as AppActions from '../actions/appActions';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FbLogin from '../assets/fb-login.png';
import Logo from '../assets/logo-login.png';
import Background from '../assets/splash.jpg';
import "./LoginView.css";

/*global FB*/

class LoginView extends Component {
  onReturn = () => {
    this.props.dispatch(AppActions.switchPage(this.props.returnPage));
  };

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
            this.onReturn();
          })
      }
    }, {
      scope: 'user_friends'
    });
  }

  renderCloseButton() {
    return (
      <IconButton className="LoginView-closeButton" onClick={this.onReturn} >
        <NavigationClose color={white}/>
      </IconButton>
    );
  }

  renderSkip() {
    return (
      <span className="LoginView-skip" onClick={this.onReturn}>
        <b>Continue</b> without account
      </span>
    );
  }

  render() {
    return (
      <div
        className="LoginView"
        style={{
          background: `url(${Background}) no-repeat center center fixed`,
          backgroundSize: 'cover'
        }}>
        {!this.props.splash ? this.renderCloseButton() : null}
        <img className="LoginView-logo" src={Logo} alt="Around" />
        <span className="LoginView-login">
          <img className="LoginView-fbButton" src={FbLogin} alt="FbLogin" onClick={this.handleFBLogin} />
          {this.props.splash ? this.renderSkip() : null}
        </span>
      </div>
    );
  }
}

export default connect()(LoginView);
