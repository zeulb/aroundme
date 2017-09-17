import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Map from './Map';
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
        <Map />
      </div>
    );
  }
}

export default App;
