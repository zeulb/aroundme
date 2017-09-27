export default function reducer(state={
    geojson: { type: "FeatureCollection", features: [] },
    isLoading: false
  }, action) {

  switch (action.type) {
    case "FETCH_GEOJSON_PENDING": {
      return {...state, isLoading: true}
    }
    case "FETCH_GEOJSON_REJECTED": {
      return {...state, isLoading: false};
    }
    case "FETCH_GEOJSON_FULFILLED": {
      return {...state, geojson: convert(action.payload), isLoading: false};
    }
    default:
      return state;
  }
}

function convert(response) {
  var geoFeatures = [];
  for (var i = 0; i < response['events'].length; i++) {
    var geoEvent = response['events'][i];
    geoFeatures.push({
      type: "Feature",
      properties: {
        scalerank: 2,
        name: geoEvent.id,
        comment: geoEvent.description,
        name_alt: null,
        lat_y: geoEvent.lat,
        long_x: geoEvent.long,
        region: null,
        subregion: null,
        featureclass: null 
      },
      geometry: {
        type: "Point",
        coordinates: [geoEvent.long, geoEvent.lat]
      }
    });
  }
  return {
    type: "FeatureCollection",
    features: geoFeatures 
  }
}
