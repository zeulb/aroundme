import React, { Component } from 'react';
import MapboxMap from './MapboxMap';
import AddButton from './AddButton';
import "./MapView.css";

class MapView extends Component {
  render() {
    return (
      <div className="MapView" style={{visibility: this.props.visible ? "visible" : "hidden"}}>
        {this.props.visible ? <AddButton /> : null}
        <MapboxMap selectMode={true} />
      </div>
    );
  }
}

export default MapView;
