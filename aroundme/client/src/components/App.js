import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class App extends Component {
  render() {
    return (
      <AppBar
        title="AroundMe"
        showMenuIconButton={false}
        iconElementRight={<IconButton><ActionSettings /></IconButton>}
      />
    );
  }
}

export default App;
