import React, { Component } from 'react';
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import "./MapView.css";

class MapView extends Component {
  render() {
    return (
      <div className="MapView">
        <AddButton />
        <MapboxMap />
      </div>
    );
  }
}

export default MapView;
