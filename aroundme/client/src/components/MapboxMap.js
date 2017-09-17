import React, { Component } from 'react';
import ReactMapboxGl, { Marker, Cluster, Popup } from 'react-mapbox-gl';
import styled from 'styled-components';

const { token, style } = require('../config/mapbox.json');
const data = require('./dummy_data.json');

const Map = ReactMapboxGl({ accessToken: token });

const mapStyle = {
  height: 'calc(100% - 64px)',
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
  }
}

const StyledPopup = styled.div`
  background: white;
  color: #3F618C;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

class MapboxMap extends Component {
  state = {
    popup: undefined
  }

  zoom = [15];

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

  render() {
    const { popup } = this.state;

    return (
      <Map
        center={[ 103.7716573, 1.295053 ]}
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