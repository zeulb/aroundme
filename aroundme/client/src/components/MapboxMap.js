import React, { Component } from 'react';
import { connect } from "react-redux"
import ReactMapboxGl, { Marker, Cluster, Layer, Feature, GeoJSONLayer } from 'react-mapbox-gl';
import './MapboxMap.css';
import * as FormActions from '../actions/formActions';
import * as MapActions from '../actions/mapActions';
import * as AppActions from '../actions/appActions';
import UserMarker from './UserMarker';
import MarkerImage from '../assets/Mapmarker.svg';

const { token, style } = require('../config/mapbox.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  height: '100%',
  width: '100%',
  touchAction: 'none'
};

const styles = {
  clusterMarker: {
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
    initialLocation: this.getCurrentPositionFromCache() || [ 103.7716573, 1.295053 ]
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
    minZoom: 1,
    maxZoom: 18
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          initialLocation: [ position.coords.longitude, position.coords.latitude ]
        });
      });
    }
    setInterval(
      () => {
        this.props.dispatch(
          MapActions.fetchMap()
        )
      },
      3000
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.selectMode && this.props.selectMode) {
      this.props.dispatch(
        FormActions.setLocation({
          lng: this.state.initialLocation[0],
          lat: this.state.initialLocation[1]
        }));
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
        style={{
          marginTop: -15,
          width: 21,
          height: 30,
          background: `url(${MarkerImage}) no-repeat center /cover`
        }}
        key={coordinates.toString()}
        coordinates={coordinates}
        onClick={this.clusterClick.bind(this, coordinates, pointCount, getLeaves)}
      >
        <div className="MapboxMap-clusterCount">{pointCount}</div>
        <div className="MapboxMap-clusterCountTriangle" />
      </Marker>
    );

  clusterClick = (coordinates, pointCount, getLeaves) => {
    const ids = getLeaves().map(e => {
      return e.props['data-feature'].properties.id
    });
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAP_FEED, {
      feedEvents: ids
    }));
  }

  markerClick = (id) => {
    this.props.dispatch(AppActions.switchPage(AppActions.Page.MAP_FEED, {
      feedEvents: [id]
    }));
  }

  renderUserMarker() {
    return <UserMarker initialLocation={this.state.initialLocation} />;
  }

  renderCircle() {
    return this.props.selectMode
      ? (
        <GeoJSONLayer
          data={createGeoJSONCircle(this.state.initialLocation, 0.2, 100)}
          fillPaint={{
            "fill-color": "red",
            "fill-opacity": 0.1
          }}/>
      )
      : null;
  }

  onSetLocation = (evt) => {
    this.props.dispatch(FormActions.setLocation(evt.lngLat));
  };

  renderLocationPin() {
    return (this.props.selectMode && this.props.selectedLocation)
      ? (
        <Layer layout={{
          'icon-size': 1.0,
          'icon-offset': [0, -28],
          'icon-image': 'location-pin-marker'
        }}>
          <Feature
            coordinates={[this.props.selectedLocation.lng, this.props.selectedLocation.lat]}
            draggable={true}
            onDragEnd={this.onSetLocation}
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
            this.props.geojson.features.map((feature, key) =>
              <Marker
                key={key}
                style={{
                  marginTop: -15,
                  width: 21,
                  height: 30,
                  background: `url(${MarkerImage}) no-repeat center /cover`
                }}
                coordinates={feature.geometry.coordinates}
                data-feature={feature}
                onClick={this.markerClick.bind(this, feature.properties.id)}
              />
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

export default connect((store) => {
  return {
    geojson: store.map.geojson,
    selectedLocation: store.form.location
  };
})(MapboxMap);
