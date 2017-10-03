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
      const pEvents = events.filter(event => (event.updated*1000) < Date.now());
      const pREvents = events.filter(event => Date.now() - (event.updated*1000) <= (3 * 24 * 60 * 60 * 1000));
      const cPEvents = pEvents.map(compactEvent);
      return {...state, events: cPEvents, geojson: toGeojson(pREvents), isLoading: false};
    }
    case "ADD_COMMENT": {
      const currentEventId = action.payload.eventId;
      const events = state.events;
      const currentEvent = events.filter(event => event.id === currentEventId)[0];
      const eventsWithoutCurrent = events.filter(event => event.id !== currentEventId);
      const newCurrentEvent = {
        ...currentEvent,
        comments: [
          ...currentEvent.comments,
          action.payload.comment
        ]
      };
      return {...state, events: [...eventsWithoutCurrent, newCurrentEvent]}
    }
    case "ADD_EVENT": {
      const events = [...state.events, action.payload];
      const geojson = {
        type: "FeatureCollection",
        features: [...state.geojson.features, {
          type: "Feature",
          properties: {
            id: action.payload.id
          },
          geometry: {
            type: "Point",
            coordinates: [action.payload.lng, action.payload.lat]
          }
        }]
      }
      return {...state, events, geojson};
    }
    case "SET_VOTE": {
      const currentEventId = action.payload.eventId;
      const events = state.events;
      const currentEvent = events.filter(event => event.id === currentEventId)[0];
      const eventsWithoutCurrent = events.filter(event => event.id !== currentEventId);
      var newCurrentEvent = {};
      if (action.payload.value === 1) {
        newCurrentEvent = {
          ...currentEvent,
          voted: true,
          userVote: 1,
          upvotes: currentEvent.upvotes + 1
        }
      } else {
        newCurrentEvent = {
          ...currentEvent,
          voted: true,
          userVote: -1,
          downvotes: currentEvent.downvotes + 1
        }
      }
      return {...state, events: [...eventsWithoutCurrent, newCurrentEvent]}
    }
    case "CHANGE_VOTE": {
      const currentEventId = action.payload.eventId;
      const events = state.events;
      const currentEvent = events.filter(event => event.id === currentEventId)[0];
      const eventsWithoutCurrent = events.filter(event => event.id !== currentEventId);
      var latestCurrentEvent = {}
      const prevUpvote = action.payload.prevUpvote;
      const newVote = action.payload.newVote;
      if (newVote === 0) {
        if (prevUpvote) {
          latestCurrentEvent = {
            ...currentEvent,
            voted: false,
            userVote: 0,
            upvotes: currentEvent.upvotes - 1
          };
        } else {
          latestCurrentEvent = {
            ...currentEvent,
            voted: false,
            userVote: 0,
            downvotes: currentEvent.downvotes - 1
          };
        }
      } else {
        if (newVote === 1) {
          latestCurrentEvent = {
            ...currentEvent,
            userVote: 1,
            downvotes: currentEvent.downvotes - 1,
            upvotes: currentEvent.upvotes + 1
          }
        } else if (newVote === -1) {
          latestCurrentEvent = {
            ...currentEvent,
            userVote: -1,
            downvotes: currentEvent.downvotes + 1,
            upvotes: currentEvent.upvotes - 1
          }
        }
      }
      return {...state, events: [...eventsWithoutCurrent, latestCurrentEvent]}
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
      name: event.user_name,
      description: event.user_description
    },
    userVote: event.user_vote,
    upvotes: event.upvotes,
    downvotes: event.downvotes,
    voted: event.disallow_vote || (event.user_vote !== 0),
    comments: event.comments.map(comment => {
      return {
        id: comment.id,
        owner: {
          id: comment.user.id,
          pictureUrl: comment.user.facebook_pic_url,
          name: comment.user.name,
          description: comment.user.description
        },
        timestamp: comment.updated * 1000,
        content: comment.content
      };
    }),
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
        id: geoEvent.id
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
