import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Cluster, Layer, Feature, Popup, GeoJSONLayer } from 'react-mapbox-gl';
import styled from 'styled-components';
import './MapboxMap.css';

const { token, style } = require('../config/mapbox.json');
const data = require('./dummy_data.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  height: '100%',
  width: '100%'
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

const StyledPopup = styled.div`
  background: white;
  color: #3F618C;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

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
    popup: undefined,
    initialLocation: [ 103.7716573, 1.295053 ],
    currentLocation: null
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          initialLocation: [ position.coords.longitude, position.coords.latitude ],
          currentLocation: [ position.coords.longitude, position.coords.latitude ]
        });
      });
    }
  }

  zoom = [16];

  clusterMarker = (
    coordinates,
    pointCount,
    getLeaves
  ) => (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={styles.clusterMarker}
        onClick={this.clusterClick.bind(this, coordinates, pointCount, getLeaves)}
      >
        <div>{pointCount}</div>
      </Marker>
    );

  onMove = () => {
    if (this.state.popup) {
      this.setState({ popup: undefined });
    }
  };

  clusterClick = (
    coordinates,
    total,
    getLeaves
  ) => {
    this.setState({
      popup: {
        coordinates,
        total,
        leaves: getLeaves()
      }
    });
  }

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
    return this.state.currentLocation
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
    return this.state.currentLocation
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
    const { popup, initialLocation } = this.state;

    return (
      <Map
        center={initialLocation}
        style={style}
        zoom={this.zoom}
        onMove={this.onMove}
        containerStyle={mapStyle}
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
        {
          popup && (
            <Popup
              offset={[0, -50]}
              coordinates={popup.coordinates}
            >
              <StyledPopup>
                {
                  popup.leaves.map((leaf, index) =>
                    <div
                      key={index}
                    >
                      {leaf.props['data-feature'].properties.name}
                    </div>
                  )
                }
                {popup.total > popup.leaves.length ? <div>And more...</div> : null}
              </StyledPopup>
            </Popup>
          )
        }
      </Map>
    )
  }
}

export default MapboxMap;