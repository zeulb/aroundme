import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MapboxMap from './MapboxMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar
          title="AroundMe"
          showMenuIconButton={false}
          iconElementRight={<IconButton><ActionSettings /></IconButton>}
        />
        <MapboxMap />
      </div>
    );
  }
}

export default App;
