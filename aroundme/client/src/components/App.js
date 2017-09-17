import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
        <FloatingActionButton className="App-addButton">
          <ContentAdd />
        </FloatingActionButton>
        <MapboxMap />
      </div>
    );
  }
}

export default App;
