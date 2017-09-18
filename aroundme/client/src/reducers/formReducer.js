export default function reducer(state={
    images: []
  }, action) {

  switch (action.type) {
    case "ADD_IMAGES": {
      return {...state, images: [...state.images, ...action.payload]};
    }
    case "RESET": {
      return {
        images: []
      };
    }
    default:
      return state;
  }
}