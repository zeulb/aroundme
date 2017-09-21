import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Cluster, Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl';
import './MapboxMap.css';

const { token, style } = require('../config/mapbox.json');
const data = require('./dummy_data.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  height: '100%',
  width: '100%',
  touchAction: 'none'
};

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  },
  userMarker: {
    backgroundColor: '#1DA1F2',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    boxShadow: '0 0 2px rgba(0,0,0,0.25)',
    border: '2px solid #fff'
  }
}

const createGeoJSONCircle = function(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [ret]
          }
      }]
    };
};

class MapboxMap extends Component {
  state = {
    initialLocation: this.getCurrentPositionFromCache() || [ 103.7716573, 1.295053 ],
    currentLocation: this.getCurrentPositionFromCache() || null
  }

  getCurrentPositionFromCache() {
    const currentLocation = localStorage.getItem('currentLocation');
    return currentLocation ? currentLocation.split(',') : null;
  }

  selectConfig = {
    zoom: [17],
    minZoom: 15,
    maxZoom: 18
  }

  normalConfig = {
    zoom: [14],
    minZoom: 4,
    maxZoom: 18
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        this.setState({
          initialLocation: [ position.coords.longitude, position.coords.latitude ],
          currentLocation: [ position.coords.longitude, position.coords.latitude ]
        });
        localStorage.setItem('currentLocation', [ position.coords.longitude, position.coords.latitude ]);
      });
    }
  }

  updateMap(map) {
    if (this.props.selectMode) {
      map.dragPan.disable();
      map.dragRotate.disable();
      map.setMinZoom(this.selectConfig.minZoom);
      map.setMaxZoom(this.selectConfig.maxZoom);
    } else {
      map.dragPan.enable();
      map.dragRotate.enable();
      map.setMinZoom(this.normalConfig.minZoom);
      map.setMaxZoom(this.normalConfig.maxZoom);
    }
  }

  onStyleLoaded = (map) => {
    this.updateMap(map);
  }

  onMapZoom = (map) => {
    this.updateMap(map);
  }

  clusterMarker = (
    coordinates,
    pointCount,
    getLeaves
  ) => (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={styles.clusterMarker}
      >
        <div>{pointCount}</div>
      </Marker>
    );

  renderUserMarker() {
    return this.state.currentLocation
      ? (
        <Marker
          key='currentUser'
          className='MapboxMap-userMarker'
          coordinates={this.state.currentLocation}
        />
      )
      : null;
  }

  renderCircle() {
    return (this.state.currentLocation && this.props.selectMode)
      ? (
        <GeoJSONLayer
          data={createGeoJSONCircle(this.state.currentLocation, 0.2, 100)}
          fillPaint={{
            "fill-color": "red",
            "fill-opacity": 0.1
          }}/>
      )
      : null;
  }

  renderLocationPin() {
    return (this.state.currentLocation && this.props.selectMode)
      ? (
        <Layer layout={{
          'icon-size': 1.0,
          'icon-offset': [0, -28],
          'icon-image': 'location-pin-marker'
        }}>
          <Feature
            coordinates={this.state.currentLocation}
            draggable={true}
          />
        </Layer>
      )
      : null;
  }

  render() {
    const { initialLocation } = this.state;

    return (
      <Map
        ref={this.mapRef}
        center={initialLocation}
        style={style}
        containerStyle={mapStyle}
        onStyleLoad={this.onStyleLoaded}
        onZoom={this.onMapZoom}
        zoom={this.props.selectMode ? this.selectConfig.zoom : this.normalConfig.zoom}
      >
        <Cluster ClusterMarkerFactory={this.clusterMarker}>
          {
            data.features.map((feature, key) =>
              <Marker
                key={key}
                style={styles.marker}
                coordinates={feature.geometry.coordinates}
                data-feature={feature}
              >
                <div
                  title={feature.properties.name}
                >
                  {feature.properties.name[0]}
                </div>
              </Marker>
            )
          }
        </Cluster>
        {this.renderUserMarker()}
        {this.renderCircle()}
        {this.renderLocationPin()}
      </Map>
    )
  }
}

export default MapboxMap;