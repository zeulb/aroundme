export default function reducer(state={
    images: [],
    description: "",
    location: null
  }, action) {

  switch (action.type) {
    case "ADD_IMAGES": {
      return {...state, images: [...state.images, ...action.payload]};
    }
    case "SET_DESCRIPTION": {
      return {...state, description: action.payload};
    }
    case "SET_LOCATION": {
      return {...state, location: action.payload};
    }
    case "CREATE_EVENT_PENDING": {
      return {...state};
    }
    case "CREATE_EVENT_REJECTED": {
      return {...state};
    }
    case "CREATE_EVENT_FULFILLED": {
      return {...state};
    }
    case "RESET": {
      return {
        images: [],
        description: "",
        location: null
      };
    }
    default:
      return state;
  }
}