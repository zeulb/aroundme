export function addImage(image) {
  return {
    type: "ADD_IMAGE",
    payload: image
  }
}

export function resetForm() {
  return {
    type: "RESET"
  }
}
