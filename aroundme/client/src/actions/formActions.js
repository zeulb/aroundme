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

export function createEvent(form) {
  var formData = new FormData();
  // TODO: update this to real user and session id.
  formData.append('user_id', '1');
  formData.append('session_id', 'JSRECMREKT');
  formData.append('long', form.location.lng);
  formData.append('lat', form.location.lat);
  formData.append('description', form.description);
  form.images.forEach(image => {
    formData.append('content[]', image.file);
  });

  return {
    type: "CREATE_EVENT",
    payload: fetch(apiUrl + "/events", {
      method: "POST",
      body: formData
    }).then(response => response.json())
  }
}

export function resetForm() {
  return {
    type: "RESET"
  }
}
