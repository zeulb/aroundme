import React, { Component } from 'react';
import { connect } from "react-redux"
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigo200, indigo300, indigo500, white} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; // (new v0.15.0 import path)
import App from './App';
import '../index.css';
import 'semantic-ui-css/semantic.min.css';
import './Root.css';

const muiTheme = getMuiTheme({
  fontFamily: 'Montserrat, Open Sans, Roboto, sans-serif',
  palette: {
    primary1Color: indigo300,
    primary2Color: indigo500
  },
  appBar: {
    height: 48
  },
  floatingActionButton: {
    color: white,
    iconColor: indigo300,
    secondaryColor: indigo200,
    secondaryIconColor: white
  },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Root extends Component {

  componentDidMount() {
    this.props.ga.initialize('UA-107184191-1', {
      debug: false,
      titleCase: false,
    })
    this.props.ga.pageview("/main");
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <App />
      </MuiThemeProvider>
    );
  }
}

export default connect((store) => {
  return {
    ga: store.app.ga
  };
})(Root);
