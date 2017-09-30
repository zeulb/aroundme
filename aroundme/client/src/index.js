import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import store from "./store"
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
const appConfig = require('./config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const appId = appConfig[nodeEnv].appId;

/*global FB*/

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
      localStorage.removeItem('session');
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


function render() {
  ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'));
}

if (localStorage.getItem('session')) {
  render();
} else {
  document.getElementsByClassName('Splash-skip')[0].addEventListener("click", () => {
    localStorage.setItem('SplashSkipLogin', true);
    render();
  });
  document.getElementsByClassName('Splash-fbButton')[0].addEventListener("click", () => {
    localStorage.setItem('SplashContinueLogin', true);
    render();
  });
}


registerServiceWorker();
