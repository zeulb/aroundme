export default function reducer(state={
    events: [],
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
      const events = action.payload['events'];
      return {...state, events: events.map(compactEvent), geojson: toGeojson(events), isLoading: false};
    }
    default:
      return state;
  }
}

function compactEvent(event) {
  var titleEnd = -1
  if (event.description) {
    titleEnd = event.description.indexOf('\n');
  }

  return {
    id: event.id,
    title:
      (titleEnd === -1)
        ? event.description
        : event.description.slice(0, titleEnd),
    description:
      (titleEnd === -1)
        ? ""
        : event.description.slice(titleEnd + 1),
    address: event.address,
    timestamp: event.updated * 1000,
    creator: {
      id: event.user_id,
      pictureUrl: event.user_facebook_pic_url,
      name: event.user_name
    },
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    voted: event.did_vote,
    comments: event.comments,
    images: event.content.map(image => image.data_url.replace('http://', 'https://'))
  };
}

function toGeojson(events) {
  var geoFeatures = [];
  for (var i = 0; i < events.length; i++) {
    var geoEvent = events[i];
    geoFeatures.push({
      type: "Feature",
      properties: {
        id: geoEvent.id,
        comment: geoEvent.description,
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
