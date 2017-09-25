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
      return {...state, geojson: action.payload, isLoading: false};
    }
    default:
      return state;
  }
}