const appConfig = require('../config/app.json');
const nodeEnv = process.env.NODE_ENV || "development";
const apiUrl = appConfig[nodeEnv].api;

export function addImages(images) {
  return {
    type: "ADD_IMAGES",
    payload: images
  }
}

export function setDescription(description) {
  return {
    type: "SET_DESCRIPTION",
    payload: description
  }
}

export function setLocation(location) {
  return {
    type: "SET_LOCATION",
    payload: location
  }
}

export function createEvent() {
  return (dispatch, getState) => {
    const state = getState();

    var formData = new FormData();
    formData.append('user_id', state.app.user.id);
    formData.append('session_id', state.app.user.session);
    formData.append('long', state.form.location.lng);
    formData.append('lat', state.form.location.lat);
    formData.append('description', state.form.description);
    state.form.images.forEach(image => {
      formData.append('content[]', image.file);
    });

    dispatch({
      type: "PUSH_CREATE_QUEUE",
      payload: formData
    });

    dispatch({
      type: "CREATE_EVENT",
      payload: fetch(apiUrl + "/events", {
        method: "POST",
        body: formData
      }).then(response => response.json())
    });
  }
}

export function popCreateQueue() {
  return {
    type: "POP_CREATE_QUEUE"
  };
}

export function resetForm() {
  return {
    type: "RESET"
  }
}
