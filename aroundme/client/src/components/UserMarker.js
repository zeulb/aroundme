import React, { Component } from 'react';
import { Marker } from 'react-mapbox-gl';
import './UserMarker.css';

class UserMarker extends Component {
  state = {
    currentLocation: this.props.initialLocation
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        this.setState({
          currentLocation: [ position.coords.longitude, position.coords.latitude ]
        });
        localStorage.setItem('currentLocation', [ position.coords.longitude, position.coords.latitude ]);
      });
    }
  }

  render() {
    return (
      <Marker
        key='currentUser'
        className='UserMarker'
        coordinates={this.state.currentLocation}
      />
    );
  }
}

export default UserMarker;
