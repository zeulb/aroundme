const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

export function fetchMap(images) {
  return {
    type: "FETCH_GEOJSON",
    payload: fetch(apiUrl + "/events", {
      method: "GET"
    }).then(response => response.json())
  }
}

export function addEventFromForm() {
  return (dispatch, getState) => {
    const state = getState();

    var titleEnd = -1
    if (state.form.description) {
      titleEnd = state.form.description.indexOf('\n');
    }
    const newEvent = {
      id: Math.floor(Math.random() * 10000),
      title:
        (titleEnd === -1)
          ? state.form.description
          : state.form.description.slice(0, titleEnd),
      description:
        (titleEnd === -1)
          ? ""
          : state.form.description.slice(titleEnd + 1),
      address: '-',
      timestamp: Date.now(),
      creator: {
        id: state.app.user.id,
        pictureUrl: state.app.user.pictureUrl,
        name: state.app.user.fullName
      },
      upvotes: 0,
      downvotes: 0,
      voted: false,
      comments: [],
      images: state.form.images.map(image => image.image),
      lng: state.form.location.lng,
      lat: state.form.location.lat
    };

    dispatch({
      type: "ADD_EVENT",
      payload: newEvent
    });
  } 
}