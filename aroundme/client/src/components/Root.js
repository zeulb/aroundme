import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './Root.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Root extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    );
  }
}

export default Root;
