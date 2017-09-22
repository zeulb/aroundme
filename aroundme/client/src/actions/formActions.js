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
  return {
    type: "CREATE_EVENT"
  }
}

export function resetForm() {
  return {
    type: "RESET"
  }
}
