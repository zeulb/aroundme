import GoogleAnalytics from "./GoogleAnalytics"

export default function reducer(state={
    images: [],
    description: "",
    created: false,
    location: null
  }, action) {

  var ga = new GoogleAnalytics()
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
      ga.event({
        category: 'Event',
        action: 'Create rejected'
      });
      return {...state};
    }
    case "CREATE_EVENT_FULFILLED": {
      ga.event({
        category: 'Event',
        action: 'Create fulfilled'
      });
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
