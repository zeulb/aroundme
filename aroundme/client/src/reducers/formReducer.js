export default function reducer(state={
    images: [],
    description: "",
    created: false,
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
      return {...state, created: true};
    }
    case "RESET": {
      return {
        images: [],
        description: "",
        created: false,
        location: null
      };
    }
    default:
      return state;
  }
}