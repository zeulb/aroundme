export function addImages(images) {
  return {
    type: "ADD_IMAGES",
    payload: images
  }
}

export function resetForm() {
  return {
    type: "RESET"
  }
}
