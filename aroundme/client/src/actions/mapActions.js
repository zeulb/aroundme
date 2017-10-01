const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

export function fetchMap(images) {
  return (dispatch, getState) => {
    const state = getState();
    const endPoint = state.app.isLoggedIn ? `/events?user_id=${state.app.user.id}` : 'events';

    dispatch({
      type: "FETCH_GEOJSON",
      payload: fetch(apiUrl + endPoint, {
        method: "GET"
      }).then(response => response.json())
    });
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

export function upvote(eventId) {
  return (dispatch, getState) => {
    const state = getState();
    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    formData.append('vote', 1);

    dispatch({
      type: "SET_VOTE",
      payload: {
        eventId,
        value: 1
      }
    });
    dispatch({
      type: "UPVOTE",
      payload: fetch(apiUrl + `/events/${eventId}/votes`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}

export function downvote(eventId) {
  return (dispatch, getState) => {
    const state = getState();
    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    formData.append('vote', -1);

    dispatch({
      type: "SET_VOTE",
      payload: {
        eventId,
        value: -1
      }
    });
    dispatch({
      type: "DOWNVOTE",
      payload: fetch(apiUrl + `/events/${eventId}/votes`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}

export function changevote(eventId, isUpvote, wasUpvote) {
  return (dispatch, getState) => {
    const state = getState();
    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    var newVote = ((isUpvote && wasUpvote) || (!isUpvote && !wasUpvote)) ? 0 : isUpvote? 1 : -1;
    formData.append('vote', newVote);
    console.log(newVote);

    dispatch({
      type: "CHANGE_VOTE",
      payload: {
        eventId,
        prevUpvote: wasUpvote,
        newVote: newVote
      }
    });
    dispatch({
      type: "CHANGEVOTE",
      payload: fetch(apiUrl + `/events/${eventId}/votes`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}

export function comment(eventId, content) {
  return (dispatch, getState) => {
    const state = getState();
    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    formData.append('content', content);

    const newComment = {
      id: Math.floor(Math.random() * 10000),
      owner: {
        id: state.app.user.id,
        pictureUrl: state.app.user.pictureUrl,
        name: state.app.user.fullName
      },
      timestamp: Date.now(),
      content: content
    }

    dispatch({
      type: "ADD_COMMENT",
      payload: {
        eventId,
        comment: newComment
      }
    });
    dispatch({
      type: "COMMENT",
      payload: fetch(apiUrl + `/events/${eventId}/comments`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}
